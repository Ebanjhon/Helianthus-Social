import React, { createContext, useReducer, useContext } from 'react';

// Tạo Context
const TabBarContext = createContext();

// Reducer để quản lý trạng thái của TabBar
const tabBarReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW_TAB_BAR':
            return { ...state, visible: true };
        case 'HIDE_TAB_BAR':
            return { ...state, visible: false };
        default:
            return state;
    }
};

// Provider cho Context
export const TabBarProvider = ({ children }) => {
    const [state, dispatch] = useReducer(tabBarReducer, { visible: true });

    return (
        <TabBarContext.Provider value={{ state, dispatch }}>
            {children}
        </TabBarContext.Provider>
    );
};

// Hook để sử dụng Context
export const useTabBar = () => useContext(TabBarContext);