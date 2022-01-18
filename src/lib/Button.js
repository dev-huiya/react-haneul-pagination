import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from "prop-types";

function PageButton({
    ...props
}) {
    return (
        <button {...props}>
            {props.children}
        </button>
    )
}

PageButton.propTypes = {
}

PageButton.defaultProps = {
}

export default PageButton;