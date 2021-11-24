import React, { createContext } from 'react';

export const ThemeContext = createContext();

class ThemeContextProvider extends React.Component {
    state = {
        isDarkTheme: true,
        light: { bg: 'rgb(255, 255, 255, 0.3)', text: 'rgba(10, 10, 10, 0.5)' },
        dark: { bg: 'rgba(10, 10, 10, 0.5)', text: 'rgb(255, 255, 255, 0.3)' }
    }
    toggleTheme = () => {
        this.setState({ isDarkTheme: !this.state.isDarkTheme })
    }
    render() {

        return <ThemeContext.Provider value={{ ...this.state, toggleTheme: this.toggleTheme }}>
            {this.props.children}
        </ThemeContext.Provider>
    }
}

export default ThemeContextProvider;


