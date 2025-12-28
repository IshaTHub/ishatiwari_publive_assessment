import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const ElectionContext = createContext();

export const ElectionProvider = ({ children }) => {
    const [elections, setElections] = useState([]);
    const [currentElection, setCurrentElection] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadElections();
    }, []);

    const loadElections = async () => {
        setLoading(true);
        const data = await apiService.getElections();
        setElections(data);
        setLoading(false);
    };

    const selectElection = async (id) => {
        const election = await apiService.getElection(id);
        setCurrentElection(election);
    };

    const value = {
        elections,
        currentElection,
        selectElection,
        loading,
        reload: loadElections
    };

    return (
        <ElectionContext.Provider value={value}>
            {children}
        </ElectionContext.Provider>
    );
};

export const useElection = () => {
    const context = useContext(ElectionContext);
    if (!context) {
        throw new Error('useElection must be used within ElectionProvider');
    }
    return context;
};