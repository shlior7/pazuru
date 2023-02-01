import './Grid.css';

import React from 'react';

class NumberCell extends React.Component {
    /**
     * @description Display blank cell in the Kakuro grid
     * @param {Number} value
     */
    constructor(props) {
        super(props);
    }

    render() {
        const { value } = this.props;
        return (
            <div className="gridCell">
                <input
                    type="number"
                    step="1"
                    min="1"
                    max="9"
                    value={value}
                />
            </div>
        );
    }
}

export default NumberCell;
