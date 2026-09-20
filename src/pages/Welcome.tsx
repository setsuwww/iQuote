import {
    IonButton,
    IonContent,
    IonPage,
} from "@ionic/react";
import { useNavigate } from "react-router-dom";

const Welcome: React.FC = () => {
    const navigate = useNavigate();

    return (
        <IonPage>
            <IonContent fullscreen>
                <div className="min-h-[100dvh] flex items-center justify-center px-6 sm:px-8">
                    <div className="w-full max-w-xl text-center">
                        <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-gray-400">
                            iQuote
                        </p>

                        <h1 className="mt-5 sm:mt-6 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
                            Words can become
                            <br />
                            something meaningful.
                        </h1>

                        <p className="mx-auto mt-4 sm:mt-5 max-w-sm sm:max-w-md text-sm sm:text-base text-gray-500 leading-relaxed">
                            A simple space for words, thoughts, and moments
                            worth remembering.
                        </p>

                        <IonButton
                            className="mt-8 sm:mt-10 normal-case"
                            onClick={() => navigate("/introduction")}
                        >
                            Get Started
                        </IonButton>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Welcome;
