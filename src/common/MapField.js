import React from 'react';
import { TextField, SimpleShowLayout } from 'react-admin';
import { Wrapper, Status} from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { useRecordContext } from 'ra-core';

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

    let initialLatLng = [];
    let initialCenter = { lat: 0, lng: 0};
    let initialZoom = 13;
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

    return (
        <>
            <Map
                center={center}
                zoom={zoom}
                gestureHandgestureHandling
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
                <SimpleShowLayout>
                    <TextField source='location._lat' label='Latitude' />
                    <TextField source='location._long' label='Longitude' />
                    <TextField source='location.zoom' label='Zoom' />
                </SimpleShowLayout>
            </div>
        </>
    );
}

const Map = ({
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
            map.setOptions({...options, gestureHandling: "none", keyboardShortcuts: false});
        }
    }, [map, options]);

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

const MapField = (props) => {
    let {
        record,
        resource,
        source,
        label,
        ...rest
    } = props;

    return (
        <div style={{ display: "flex", height: "400px", width: "100%" }}>
            <Wrapper apiKey="AIzaSyAkBhTU6Tc8FNdu64ZRG4rPm2bin7H7OOI" render={(status) => render(status, props)} />
        </div>
    );
};

MapField.defaultProps = {
    variant: 'filled',
    margin: 'dense'
};


export default MapField;