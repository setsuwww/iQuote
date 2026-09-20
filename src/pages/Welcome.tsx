import {
    IonContent,
    IonPage,
} from "@ionic/react";
import { useNavigate } from "react-router-dom";
import { IonRippleEffect } from '@ionic/react';

const Welcome: React.FC = () => {
    const navigate = useNavigate();

    return (
        <IonPage>
            <IonContent fullscreen>
                <div className="min-h-[100dvh] flex items-center justify-center px-6 sm:px-8">
                    <div className="w-full max-w-xl text-center">
                        <p className="text-xs sm:text-sm text-sky-600">
                            IQuote
                        </p>

                        <h1 className="mt-5 sm:mt-6 text-4xl sm:text-6xl md:text-6xl font-semibold tracking-tight leading-tight">
                            Words can become
                            <br />
                            something <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-purple-400">meaningful.</span>
                        </h1>

                        <p className="mx-auto mt-4 sm:mt-5 max-w-sm sm:max-w-md text-sm sm:text-base text-gray-500 leading-relaxed">
                            A simple space for words, thoughts, and moments
                            worth remembering.
                        </p>

                        <button
                            className="mt-8 sm:mt-10 text-sm !rounded-full bg-sky-600 !px-4 !py-3"
                            onClick={() => navigate("/home")}
                        >
                            <IonRippleEffect></IonRippleEffect>
                            Get Started
                        </button>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Welcome;
