import React, { useState } from 'react';
import TermsOfService from './TermsOfService';
// Other imports

const App = () => {
    const [tosOpen, setTosOpen] = useState(false);

    return (
        <div>
            {/* Other components */}
            <footer>
                {/* Other footer content */}
                <button onClick={() => setTosOpen(true)}>Terms of Service</button>
            </footer>
            <TermsOfService open={tosOpen} onClose={() => setTosOpen(false)} />
        </div>
    );
};

export default App;
