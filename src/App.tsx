import React, { useState } from 'react';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';
import { Hero } from './components/Hero';
import { Podium } from './components/Podium';
import { Leaderboard } from './components/Leaderboard';
import { Footer } from './components/Footer';

const App = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="App">
            <Header onToggleMenu={toggleMobileMenu} />
            <MobileMenu isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
            <main>
                <Hero />
                <Podium />
                <Leaderboard />
            </main>
            <Footer />
        </div>
    );
};

export default App;