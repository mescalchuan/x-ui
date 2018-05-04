const errorInfo = (propName, componentName, info) => {
    return `Invalid prop \`${propName}\` supplied to \`${componentName}\`, ${info}`;
}

export default {
    customMinValueTypes(props, propName, componentName) {
        if(typeof props[propName] !== 'number') {
            return new Error(errorInfo(propName, componentName, 'it must be number'));
        }
        if(props[propName] > props['maxValue']) {
            return new Error(errorInfo(propName, componentName, 'it must be less than maxValue'));
        }
    },
    customMaxValueTypes(props, propName, componentName) {
        if(typeof props[propName] !== 'number') {
            return new Error(errorInfo(propName, componentName, 'it must be number'));
        }
        if(props[propName] < props['minValue']) {
            return new Error(errorInfo(propName, componentName, 'it must be greater than minValue'));
        }
    },
    customValueTypes(props, propName, componentName) {
        if(typeof props[propName] !== 'undefined') {
            if(typeof props[propName] !== 'number') {
                return new Error(errorInfo(propName, componentName, 'it must be number'));
            }
        }
        if(props[propName] < props['minValue']) {
            return new Error(errorInfo(propName, componentName, 'it must be greater than minValue'));
        }
        else if(props[propName] > props['maxValue']) {
            return new Error(errorInfo(propName, componentName, 'it must be less than maxValue'));
        }
    },

    customPageNumTypes(props, propName, componentName) {
        if(props[propName] != null) {
            if(typeof props[propName] !== 'number') {
                return new Error(errorInfo(propName, componentName, 'it must be number'));
            }
            else{
                if(props[propName] < 1) {
                    return new Error(errorInfo(propName, componentName, 'it must be greater than or equal to 1'));
                }
                else if(props[propName] > props['pageTotal']) {
                    return new Error(errorInfo(propName, componentName, 'it must be less than or equal to pageTotal'));
                }
            }
        }
    },
    customPageTotalTypes(props, propName, componentName) {
        if(typeof props[propName] != 'number') {
            return new Error(errorInfo(propName, componentName, 'it must be number'));
        }
        else if(props[propName] < 1) {
            return new Error(errorInfo(propName, componentName, 'it must be greater than or equal to 1'));
        }
    },

    customProgressTypes(props, propName, componentName) {
        if(typeof props[propName] !== 'number') {
            return new Error(errorInfo(propName, componentName, 'it must be number'));
        }
        if(props[propName] < props['minValue']) {
            return new Error(errorInfo(propName, componentName, 'it must be greater than minValue'));
        }
        else if(props[propName] > props['maxValue']) {
            return new Error(errorInfo(propName, componentName, 'it must be less than maxValue'));
        }
    }
}