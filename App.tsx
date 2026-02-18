// Restored content of App.tsx from commit 19980349534f62fb606ffe1ebfc8f72d8d8e9f16

import React, { useState } from 'react';
import TermsOfService from './TermsOfService';

const App = () => {
    const [tosOpen, setTosOpen] = useState(false);

    return (
        <main>
            {/* Other components */}
            <footer>
                <span onClick={() => setTosOpen(true)}>Terms of Service</span>
            </footer>
            <TermsOfService isOpen={tosOpen} onClose={() => setTosOpen(false)} />
        </main>
    );
};

export default App;