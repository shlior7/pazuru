import './Grid.css';

import React from 'react';

class BlankCell extends React.Component {
    /**
     * @description Display blank cell in the Kakuro grid
     * @param {Number} x
     * @param {Number} y
     * @param {Function} updateCellValue
     */
    constructor(props) {
        super(props);
    }

    render() {
        const { x, y, value } = this.props;
        return (
            <div className="gridCell">
                <input
                    type="number"
                    step="1"
                    min="1"
                    max="9"
                    value={value}
                    onBlur={e => this.props.updateCellValue(x, y, e.target.value)} />
            </div>
        );
    }
}

export default BlankCell;
