import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = themes => ({
    root:{
        display: 'inline-block'
    },
    label: {
        padding: 0,
        margin: 0,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: '1.4rem'
    },
    svgElm: {
        marginBottom: themes.spacing.unit * 2
    },
    circleBackground: {
        fill: 'none',
        stroke: '#ddd'
    },
    circleProgress: {
        fill: 'none',
        stroke: 'red',
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },
    circleText: {
        fontSize: '3em',
        fontWeight: 'bold',
        fill: 'red'
      }
})
class CircularProgress extends Component{
    render() {
        const { classes, numerator, denominator } = this.props;
        const strokeColor = 'green';
        const sqSize = 150;
        const viewBox = `0 0 ${sqSize} ${sqSize}`;
        const strokeWidth= 10;
        const radius = (sqSize - strokeWidth) / 2;
        const dashArray = radius * Math.PI * 2;
        const dashOffset = dashArray - dashArray * (numerator/ denominator);
        return (
            <div className={ classes.root }>
                <svg 
                    width={sqSize}
                    height={sqSize}
                    viewBox={viewBox}
                    className={classes.svgElm}
                >
                    <circle
                        className={classes.circleBackground}
                        cx={sqSize / 2}
                        cy={sqSize / 2}
                        r={radius}
                        strokeWidth={`${strokeWidth}px`} 
                    />
                    <circle
                        className={classes.circleProgress}
                        cx={sqSize / 2}
                        cy={sqSize / 2}
                        r={radius}
                        strokeWidth={`${strokeWidth}px`}
                        // Start progress marker at 12 O'Clock
                        transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
                        style={{
                            strokeDasharray: dashArray,
                            strokeDashoffset: dashOffset,
                            stroke: strokeColor
                        }} 
                    />
                    <text
                        className={classes.circleText}
                        style={{fill: strokeColor }}
                        x="50%"
                        y="50%"
                        dy=".3em"
                        textAnchor="middle">
                            {numerator}/{denominator}
                    </text>
                </svg>
                <p className={classes.label}>{this.props.children}</p>
            </div>
        )
    }
}

/*

render() {
    // Size of the enclosing square
    const sqSize = this.props.sqSize;
    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (this.props.sqSize - this.props.strokeWidth) / 2;
    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2;
    // Scale 100% coverage overlay with the actual percent
    const dashOffset = dashArray - dashArray * this.props.percentage / 100;

    return (
      <svg
          width={this.props.sqSize}
          height={this.props.sqSize}
          viewBox={viewBox}>
          <circle
            className="circle-background"
            cx={this.props.sqSize / 2}
            cy={this.props.sqSize / 2}
            r={radius}
            strokeWidth={`${this.props.strokeWidth}px`} />
          <circle
            className="circle-progress"
            cx={this.props.sqSize / 2}
            cy={this.props.sqSize / 2}
            r={radius}
            strokeWidth={`${this.props.strokeWidth}px`}
            // Start progress marker at 12 O'Clock
            transform={`rotate(-90 ${this.props.sqSize / 2} ${this.props.sqSize / 2})`}
            style={{
              strokeDasharray: dashArray,
              strokeDashoffset: dashOffset
            }} />
          <text
            className="circle-text"
            x="50%"
            y="50%"
            dy=".3em"
            textAnchor="middle">
            {`${this.props.percentage}%`}
          </text>
      </svg>
    );
  }

*/

CircularProgress.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularProgress);