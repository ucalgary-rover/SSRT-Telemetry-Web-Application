import React, { useEffect } from 'react';
import './HomePage.css';

function HomePage() {

    // Parallax effect
    useEffect(() => {
        const handleMouseMove = (event) => {
            const backgroundImage = document.querySelector('.background-image');

            if (backgroundImage) {
                const mouseX = event.clientX;
                const mouseY = event.clientY;

                const xPercent = (-mouseX / window.innerWidth);
                const yPercent = (-mouseY / window.innerHeight);

                backgroundImage.style.left = `${xPercent}%`;
                backgroundImage.style.top = `${yPercent}% `;
            }
        };

        document.addEventListener('mousemove', handleMouseMove);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div>
            <div className="background-image" />
        </div>
    );
}

export default HomePage;
