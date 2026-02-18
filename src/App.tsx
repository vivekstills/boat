import React, { useState } from 'react';
// other imports
import BonusCards from './BonusCards';
import TermsOfService from './TermsOfService';

const App = () => {
    const [showTermsOfService, setShowTermsOfService] = useState(false);
    // other states

    return (
        <div>
            {/* other components */}
            <footer>
                <div className="legal">
                    <a className="footer-link" onClick={() => setShowTermsOfService(true)}>Terms of Service</a>
                </div>
            </footer>
            {showTermsOfService && <TermsOfService />}
        </div>
    );
};

export default App;