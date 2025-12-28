// Mock API Service with CRUD operations
export const apiService = {
    data: {
        elections: [
            { id: 1, name: '2024 General Election', date: '2024-11-05', status: 'completed', constituenciesCount: 10 },
            { id: 2, name: '2025 Local Election', date: '2025-03-15', status: 'upcoming', constituenciesCount: 8 }
        ],
        constituencies: [
            { id: 1, code: 'NORTH-01', name: 'North District', electionId: 1, totalVoters: 50000 },
            { id: 2, code: 'SOUTH-01', name: 'South District', electionId: 1, totalVoters: 45000 },
            { id: 3, code: 'EAST-01', name: 'East District', electionId: 2, totalVoters: 38000 }
        ],
        parties: [
            { id: 1, name: 'Democratic Party', abbr: 'DP', color: '#0066cc' },
            { id: 2, name: 'Republican Party', abbr: 'RP', color: '#cc0000' },
            { id: 3, name: 'Independent', abbr: 'IND', color: '#666666' }
        ],
        candidates: [
            { id: 1, name: 'John Smith', partyId: 1, constituencyId: 1, age: 45, bio: 'Former mayor' },
            { id: 2, name: 'Jane Doe', partyId: 2, constituencyId: 1, age: 52, bio: 'Business leader' },
            { id: 3, name: 'Bob Wilson', partyId: 3, constituencyId: 2, age: 38, bio: 'Community activist' },
            { id: 4, name: 'Alice Brown', partyId: 1, constituencyId: 3, age: 41, bio: 'Teacher' }
        ],
        results: [
            { id: 1, candidateId: 1, constituencyId: 1, votes: 25000, winner: true },
            { id: 2, candidateId: 2, constituencyId: 1, votes: 22000, winner: false },
            { id: 3, candidateId: 3, constituencyId: 2, votes: 28000, winner: true },
            { id: 4, candidateId: 4, constituencyId: 3, votes: 20000, winner: true }
        ]
    },

    // Elections CRUD
    getElections: async () => {
        console.log('Fetching elections...');
        return [...apiService.data.elections];
    },

    getElection: async (id) => {
        console.log('Fetching election:', id);
        return apiService.data.elections.find(e => e.id === parseInt(id));
    },

    createElection: async (data) => {
        const newItem = { ...data, id: Math.max(...apiService.data.elections.map(e => e.id), 0) + 1 };
        apiService.data.elections.push(newItem);
        console.log('Created election:', newItem);
        return newItem;
    },

    updateElection: async (id, data) => {
        const index = apiService.data.elections.findIndex(e => e.id === parseInt(id));
        if (index !== -1) {
            apiService.data.elections[index] = { ...data, id: parseInt(id) };
            console.log('Updated election:', apiService.data.elections[index]);
        }
    },

    deleteElection: async (id) => {
        apiService.data.elections = apiService.data.elections.filter(e => e.id !== parseInt(id));
        console.log('Deleted election:', id);
    },

    // Constituencies CRUD
    getConstituencies: async (electionId) => {
        console.log('Fetching constituencies for election:', electionId);
        if (electionId) {
            return apiService.data.constituencies.filter(c => c.electionId === parseInt(electionId));
        }
        return [...apiService.data.constituencies];
    },

    createConstituency: async (data) => {
        const newItem = { ...data, id: Math.max(...apiService.data.constituencies.map(c => c.id), 0) + 1 };
        apiService.data.constituencies.push(newItem);
        console.log('Created constituency:', newItem);
        return newItem;
    },

    updateConstituency: async (id, data) => {
        const index = apiService.data.constituencies.findIndex(c => c.id === parseInt(id));
        if (index !== -1) {
            apiService.data.constituencies[index] = { ...data, id: parseInt(id) };
            console.log('Updated constituency:', apiService.data.constituencies[index]);
        }
    },

    deleteConstituency: async (id) => {
        apiService.data.constituencies = apiService.data.constituencies.filter(c => c.id !== parseInt(id));
        console.log('Deleted constituency:', id);
    },

    // Parties CRUD
    getParties: async () => {
        console.log('Fetching parties...');
        return [...apiService.data.parties];
    },

    createParty: async (data) => {
        const newItem = { ...data, id: Math.max(...apiService.data.parties.map(p => p.id), 0) + 1 };
        apiService.data.parties.push(newItem);
        console.log('Created party:', newItem);
        return newItem;
    },

    updateParty: async (id, data) => {
        const index = apiService.data.parties.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
            apiService.data.parties[index] = { ...data, id: parseInt(id) };
            console.log('Updated party:', apiService.data.parties[index]);
        }
    },

    deleteParty: async (id) => {
        apiService.data.parties = apiService.data.parties.filter(p => p.id !== parseInt(id));
        console.log('Deleted party:', id);
    },

    // Candidates CRUD
    getCandidates: async (electionId) => {
        console.log('Fetching candidates for election:', electionId);
        let candidates = [...apiService.data.candidates];

        if (electionId) {
            const constituencies = await apiService.getConstituencies(electionId);
            const constituencyIds = constituencies.map(c => c.id);
            candidates = candidates.filter(c => constituencyIds.includes(c.constituencyId));
        }

        const parties = await apiService.getParties();
        return candidates.map(c => {
            const party = parties.find(p => p.id === c.partyId);
            return { ...c, party: party?.name, partyColor: party?.color };
        });
    },

    createCandidate: async (data) => {
        const newItem = { ...data, id: Math.max(...apiService.data.candidates.map(c => c.id), 0) + 1 };
        apiService.data.candidates.push(newItem);
        console.log('Created candidate:', newItem);
        return newItem;
    },

    updateCandidate: async (id, data) => {
        const index = apiService.data.candidates.findIndex(c => c.id === parseInt(id));
        if (index !== -1) {
            apiService.data.candidates[index] = { ...data, id: parseInt(id) };
            console.log('Updated candidate:', apiService.data.candidates[index]);
        }
    },

    deleteCandidate: async (id) => {
        apiService.data.candidates = apiService.data.candidates.filter(c => c.id !== parseInt(id));
        console.log('Deleted candidate:', id);
    },

    // Results CRUD
    getResults: async (electionId) => {
        console.log('Fetching results for election:', electionId);
        let results = [...apiService.data.results];

        if (electionId) {
            const constituencies = await apiService.getConstituencies(electionId);
            const constituencyIds = constituencies.map(c => c.id);
            results = results.filter(r => constituencyIds.includes(r.constituencyId));
        }

        return results;
    },

    createResult: async (data) => {
        const newItem = { ...data, id: Math.max(...apiService.data.results.map(r => r.id), 0) + 1 };
        apiService.data.results.push(newItem);
        console.log('Created result:', newItem);
        return newItem;
    },

    updateResult: async (id, data) => {
        const index = apiService.data.results.findIndex(r => r.id === parseInt(id));
        if (index !== -1) {
            apiService.data.results[index] = { ...data, id: parseInt(id) };
            console.log('Updated result:', apiService.data.results[index]);
        }
    },

    deleteResult: async (id) => {
        apiService.data.results = apiService.data.results.filter(r => r.id !== parseInt(id));
        console.log('Deleted result:', id);
    }
};