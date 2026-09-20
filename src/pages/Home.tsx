import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonToolbar,
} from "@ionic/react";

import {
  cameraOutline,
  textOutline,
  textSharp,
} from "ionicons/icons";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";

const fonts = [
  {
    label: "Inter",
    value: "Inter, sans-serif",
  },
  {
    label: "Georgia",
    value: "Georgia, serif",
  },
  {
    label: "Courier New",
    value: "'Courier New', monospace",
  },
  {
    label: "Times New Roman",
    value: "'Times New Roman', serif",
  },
];

type Alignment = "left" | "center" | "right" | "justify";

const Home: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const [align, setAlign] = useState<Alignment>("left");

  const [font, setFont] = useState("Inter, sans-serif");

  const execCommand = (
    command: string,
    value?: string
  ) => {
    editorRef.current?.focus();

    document.execCommand(
      command,
      false,
      value
    );
  };

  const toggleFormat = (
    command: "bold" | "italic" | "underline",
    current: boolean,
    setter: (value: boolean) => void
  ) => {
    setter(!current);

    execCommand(command);
  };

  const changeAlign = (value: Alignment) => {
    setAlign(value);

    const commands: Record<
      Alignment,
      string
    > = {
      left: "justifyLeft",
      center: "justifyCenter",
      right: "justifyRight",
      justify: "justifyFull",
    };

    execCommand(commands[value]);
  };

  const changeFont = (value: string) => {
    setFont(value);

    execCommand(
      "fontName",
      value
    );
  };

  const handleScreenshot = async () => {
    if (!editorRef.current) return;

    const canvas =
      await html2canvas(
        editorRef.current,
        {
          backgroundColor: "#0f1115",
          scale: 2,
          useCORS: true,
        }
      );

    const link =
      document.createElement("a");

    link.download =
      `quote-${ Date.now() }.png`;

    link.href =
      canvas.toDataURL("image/png");

    link.click();
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <main className="min-h-[100dvh] bg-black px-5 py-8 sm:px-8 md:px-12">

          <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">

            {/* Header */}
            <IonToolbar
              color="transparent"
              className="ion-no-padding"
            >
              <IonButtons slot="start">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                    iQuote
                  </p>

                  <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                    Create something meaningful.
                  </h1>
                </div>
              </IonButtons>

              <IonButtons slot="end">
                <IonButton
                  fill="solid"
                  color="primary"
                  onClick={handleScreenshot}
                >
                  <IonIcon
                    slot="start"
                    icon={cameraOutline}
                  />

                  Screenshot
                </IonButton>
              </IonButtons>
            </IonToolbar>

            {/* Editor Card */}
            <IonCard
              className={`
m-0 overflow-hidden
                border transition-all duration-300
                ${
  isFocused
    ? "border-sky-500/60 shadow-lg shadow-sky-500/10"
    : "border-white/10"
}
`}
            >

              {/* Editor Toolbar */}
              <IonToolbar
                color="dark"
                className="border-b border-white/10"
              >

                <IonButtons slot="start">

                  {/* Bold */}
                  <IonButton
                    fill={isBold ? "solid" : "clear"}
                    color={isBold ? "primary" : "medium"}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() =>
                      toggleFormat(
                        "bold",
                        isBold,
                        setIsBold
                      )
                    }
                  >
                    <strong>B</strong>
                  </IonButton>

                  {/* Italic */}
                  <IonButton
                    fill={isItalic ? "solid" : "clear"}
                    color={isItalic ? "primary" : "medium"}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() =>
                      toggleFormat(
                        "italic",
                        isItalic,
                        setIsItalic
                      )
                    }
                  >
                    <em>I</em>
                  </IonButton>

                  {/* Underline */}
                  <IonButton
                    fill={
                      isUnderline
                        ? "solid"
                        : "clear"
                    }
                    color={
                      isUnderline
                        ? "primary"
                        : "medium"
                    }
                    onMouseDown={(e) =>
                      e.preventDefault()
                    }
                    onClick={() =>
                      toggleFormat(
                        "underline",
                        isUnderline,
                        setIsUnderline
                      )
                    }
                  >
                    <u>U</u>
                  </IonButton>

                </IonButtons>

                {/* Font */}
                <IonItem
                  slot="end"
                  color="dark"
                  lines="none"
                >
                  <IonLabel>
                    Font
                  </IonLabel>

                  <IonSelect
                    value={font}
                    interface="popover"
                    onIonChange={(e) =>
                      changeFont(
                        e.detail.value
                      )
                    }
                  >
                    {fonts.map(
                      (item) => (
                        <IonSelectOption
                          key={
                            item.value
                          }
                          value={
                            item.value
                          }
                        >
                          {item.label}
                        </IonSelectOption>
                      )
                    )}
                  </IonSelect>
                </IonItem>

              </IonToolbar>

              {/* Alignment Toolbar */}
              <IonToolbar
                color="dark"
                className="border-b border-white/10"
              >
                <IonButtons slot="start">

                  <IonButton
                    fill={
                      align === "left"
                        ? "solid"
                        : "clear"
                    }
                    onClick={() =>
                      changeAlign(
                        "left"
                      )
                    }
                  >
                    Left
                  </IonButton>

                  <IonButton
                    fill={
                      align === "center"
                        ? "solid"
                        : "clear"
                    }
                    onClick={() =>
                      changeAlign(
                        "center"
                      )
                    }
                  >
                    Center
                  </IonButton>

                  <IonButton
                    fill={
                      align === "right"
                        ? "solid"
                        : "clear"
                    }
                    onClick={() =>
                      changeAlign(
                        "right"
                      )
                    }
                  >
                    Right
                  </IonButton>

                  <IonButton
                    fill={
                      align === "justify"
                        ? "solid"
                        : "clear"
                    }
                    onClick={() =>
                      changeAlign(
                        "justify"
                      )
                    }
                  >
                    Justify
                  </IonButton>

                </IonButtons>
              </IonToolbar>

              {/* Editable Content */}
              <IonCardContent
                className="p-0"
              >
                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning
                  onFocus={() =>
                    setIsFocused(true)
                  }
                  onBlur={() =>
                    setIsFocused(false)
                  }
                  data-placeholder="Write something..."
                  className="
                    min-h-[350px]
                    w-full
                    bg-[#0f1115]
                    p-6
                    text-lg
                    leading-relaxed
                    text-gray-100
                    outline-none
                    sm:min-h-[450px]
                    sm:p-8
                  "
                  style={{
                    fontFamily: font,
                  }}
                />
              </IonCardContent>

            </IonCard>

            {/* Helper */}
            <IonItem
              lines="none"
              color="transparent"
              className="text-center"
            >
              <IonLabel>
                <p className="text-xs text-gray-500">
                  Select text to format it,
                  then capture your quote.
                </p>
              </IonLabel>
            </IonItem>

          </div>

        </main>

        {/* ContentEditable Placeholder */}
        <style>
          {`
[contenteditable][data-placeholder]: empty::before {
  content: attr(data-placeholder);
  color: #4b5563;
  pointer-events: none;
}

[contenteditable]::selection {
  background: #22c55e;
  color: #ffffff;
}
`}
        </style>

      </IonContent>
    </IonPage>
  );
};

export default Home;
