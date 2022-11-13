import React from 'react';
import { TextInput } from 'react-admin';
import { useFormContext } from "react-hook-form";
import { Wrapper, Status} from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { useRecordContext } from 'ra-core';
import { firebaseConfig as config } from '../FIREBASE_CONFIG';

const render = (status, props) => {
    switch (status) {
    case Status.LOADING:
        return <h2>Loading...</h2>;
    case Status.FAILURE:
        return <h2>Error</h2>;
    case Status.SUCCESS:
        return <App {...props} />;
    }
};

const App = (props) => {
    let {
        record,
        resource,
        source,
        label,
        ...rest
    } = props;
    let value = useRecordContext(props) || {};
    value = value[source];

    const { setValue } = useFormContext();
    let initialLatLng = [];
    let initialCenter = { lat: config.initialMapView.lat, lng: config.initialMapView.lng};
    let initialZoom = config.initialMapView.zoom;
    if(value && value._lat && value._long) {
        let lat = parseFloat(value._lat);
        let lng = parseFloat(value._long);
        initialLatLng = [new google.maps.LatLng(lat, lng)];
        initialCenter = {
            lat: parseFloat(value._lat) || 0,
            lng: parseFloat(value._long) || 0,
        };
        if(value.zoom) {
            initialZoom = parseFloat(value.zoom);
        }
    }
    const [clicks, setClicks] = React.useState(initialLatLng);
    const [zoom, setZoom] = React.useState(initialZoom); // initial zoom
    const [center, setCenter] = React.useState(initialCenter);

    const onClick = (e) => {
        // avoid directly mutating state
        setClicks([e.latLng]);
        setValue('location._lat', e.latLng.lat());
        setValue('location._long', e.latLng.lng())
    };

    const onIdle = (m) => {
        try {
            let zoomLevel = m.getZoom();
            setZoom(zoomLevel);
            setCenter(m.getCenter().toJSON());
            zoomLevel && setValue('location.zoom', zoomLevel);
        } catch(e) {}
    };

    const changeMarker = (coordinates) => {
        let latlng = new google.maps.LatLng(coordinates.lat, coordinates.lng)
        setClicks([latlng]);
        setCenter(coordinates);
    };

    return (
        <>
            <Map
                center={center}
                onClick={onClick}
                onIdle={onIdle}
                zoom={zoom}
                style={{ flexGrow: "1", height: "100%" }}
            >
                {clicks.map((latLng, i) => (
                    <Marker key={i} position={latLng} />
                ))}
            </Map>
            <div
                style={{
                    padding: "1rem",
                    flexBasis: "250px",
                    height: "100%",
                    overflow: "auto",
                }}
            >
                <TextInput source='location._lat' onChange={(event) => changeMarker({ ...center, lat: Number(event.target.value) })}/>
                <TextInput source='location._long' onChange={(event) => changeMarker({ ...center, lng: Number(event.target.value) })}/>
                <TextInput source='location.zoom' onChange={(event) => setZoom( Number(event.target.value) )}/>
            </div>
        </>
    );
}

const Map = ({
    onClick,
    onIdle,
    children,
    style,
    ...options
}) => {
    const ref = React.useRef(null);
    const [map, setMap] = React.useState();

    React.useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));
        }
    }, [ref, map]);

    // because React does not do deep comparisons, a custom hook is used
    // see discussion in https://github.com/googlemaps/js-samples/issues/946
    useDeepCompareEffectForMaps(() => {
        if (map) {
            map.setOptions(options);
        }
    }, [map, options]);

    React.useEffect(() => {
        if (map) {
            ["click", "idle"].forEach((eventName) =>
                google.maps.event.clearListeners(map, eventName)
            );

            if (onClick) {
                map.addListener("click", onClick);
            }

            if (onIdle) {
                map.addListener("idle", () => onIdle(map));
            }
        }
    }, [map, onClick, onIdle]);

    return (
        <>
            <div ref={ref} style={{
                width: '100%',
                height: '400px',
                ...style
            }} />
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // set the map prop on the child component
                    return React.cloneElement(child, { map });
                }
            })}
        </>
    );
};

const Marker = (options) => {
    const [marker, setMarker] = React.useState();

    React.useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker());
        }

        // remove marker from map on unmount
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    React.useEffect(() => {
        if (marker) {
            marker.setOptions(options);
        }
    }, [marker, options]);

    return null;
};

const deepCompareEqualsForMaps = createCustomEqual(
    (deepEqual) => (a, b) => {
        if (
            a instanceof google.maps.LatLng ||
            b instanceof google.maps.LatLng
        ) {
            return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
        }

        // TODO extend to other types

        // use fast-equals for other objects
        return deepEqual(a, b);
    }
);

function useDeepCompareMemoize(value) {
    const ref = React.useRef();

    if (!deepCompareEqualsForMaps(value, ref.current)) {
        ref.current = value;
    }

    return ref.current;
}

function useDeepCompareEffectForMaps(
    callback,
    dependencies
) {
    React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

const LocationInput = (props) => {
    let {
        record,
        resource,
        source,
        label,
        ...rest
    } = props;

    return (
        <div style={{ display: "flex", height: "400px", width: "100%" }}>
            <Wrapper apiKey={config.googleMapApiKey} render={(status) => render(status, props)} />
        </div>
    );
};

LocationInput.defaultProps = {
    variant: 'filled',
    margin: 'dense'
};


export default LocationInput;