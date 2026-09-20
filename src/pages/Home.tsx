import { IonCard, IonCardContent, IonContent, IonIcon, IonItem, IonLabel, IonPage } from "@ionic/react";

import { cameraOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";

import { faAlignCenter, faAlignJustify, faAlignLeft, faAlignRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FormattingToolbar from "../components/FormattingToolbar";
import { saveSelection } from "../utils/editorSelection";

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

type Alignment = | "left" | "center" | "right" | "justify";

const alignmentIcons = {
  left: faAlignLeft,
  center: faAlignCenter,
  right: faAlignRight,
  justify: faAlignJustify,
};

const Home: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const [align, setAlign] = useState<Alignment>("left");

  const [font, setFont] = useState("Inter, sans-serif");


  useEffect(() => {
    const handleSelectionChange =
      () => {
        const selection =
          window.getSelection();

        if (
          !selection ||
          selection.rangeCount === 0
        ) {
          return;
        }

        const range =
          selection.getRangeAt(0);

        const editor =
          editorRef.current;

        if (!editor) {
          return;
        }

        const isInsideEditor =
          editor.contains(
            range.commonAncestorContainer
          );

        if (
          isInsideEditor &&
          !range.collapsed
        ) {
          saveSelection();
        }
      };

    document.addEventListener(
      "selectionchange",
      handleSelectionChange
    );

    return () => {
      document.removeEventListener(
        "selectionchange",
        handleSelectionChange
      );
    };
  }, []);

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
    command: | "bold" | "italic" | "underline",
    current: boolean, setter: ( value: boolean ) => void
  ) => {
    setter(!current);
    execCommand(command);
  };

  const changeAlign = ( value: Alignment ) => {
    setAlign(value);

    const commands: Record<
      Alignment, string
    > = {
      left: "justifyLeft", center: "justifyCenter", right: "justifyRight", justify: "justifyFull",
    };

    execCommand(
      commands[value]
    );
  };

  const changeFont = (
    value: string
  ) => {
    setFont(value);

    execCommand(
      "fontName",
      value
    );
  };

  const handleScreenshot =
    async () => {
      if (!editorRef.current) {
        return;
      }

      const canvas =
        await html2canvas(
          editorRef.current,
          {
            backgroundColor:
              "#0f1115",
            scale: 2,
            useCORS: true,
          }
        );

      const link =
        document.createElement(
          "a"
        );

      link.download =
        `quote-${ Date.now() }.png`;

      link.href =
        canvas.toDataURL(
          "image/png"
        );

      link.click();
    };

  const alignButtonClass = (
    active: boolean
  ) =>
    `
flex
h-8
w-8
items-center
justify-center
rounded-full
text-xs
transition-all
duration-200
active: scale-90
      ${
  active
    ? "bg-white/10 text-white"
    : "text-gray-500 hover:bg-white/5 hover:text-gray-300"
}
`;

  return (
    <IonPage>
      <IonContent fullscreen>

        <main
          className="
            min-h-[100dvh]
            bg-radial
            from-sky-500/30
            to-slate-900
            px-5
            py-8
            sm:px-8
            md:px-12
          "
        >

          <div
            className="
              mx-auto
              flex
              w-full
              max-w-3xl
              flex-col
              gap-6
            "
          >

            {/* Header */}
            <header>

              <p className="text-xs text-sky-500 sm:text-sm">
                iQuote
              </p>

              <h1
                className="
                  mt-2
                  text-2xl
                  font-semibold
                  tracking-tight
                  text-white
                  sm:text-3xl
                "
              >
                Create something{" "}

                <span
                  className="
                    bg-gradient-to-r
                    from-sky-400
                    to-purple-400
                    bg-clip-text
                    text-transparent
                  "
                >
                  meaningful.
                </span>
              </h1>

              <p
                className="
                  mt-3
                  max-w-sm
                  text-sm
                  leading-relaxed
                  text-gray-500
                "
              >
                A simple space for words,
                thoughts, and moments
                worth remembering.
              </p>

              <button
                type="button"
                onClick={
                  handleScreenshot
                }
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-sky-500
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-black
                  transition-all
                  duration-200
                  hover:bg-sky-400
                  active:scale-95
                "
              >
                <IonIcon
                  icon={
                    cameraOutline
                  }
                  className="text-base"
                />

                Screenshot
              </button>

            </header>

            {/* Formatting Toolbar */}
            <FormattingToolbar
              editorRef={
                editorRef
              }
              isBold={isBold}
              isItalic={
                isItalic
              }
              isUnderline={
                isUnderline
              }
              font={font}
              fonts={fonts}
              onToggleFormat={
                toggleFormat
              }
              onChangeFont={
                changeFont
              }
              setIsBold={
                setIsBold
              }
              setIsItalic={
                setIsItalic
              }
              setIsUnderline={
                setIsUnderline
              }
            />

            {/* Editor */}
            <IonCard
              className={`
m-0
overflow-hidden
rounded-3xl
border
bg-[#0f1115]
transition-all
duration-300

                ${
  isFocused
    ? "border-sky-500/40 shadow-2xl shadow-sky-500/10"
    : "border-white/10 shadow-xl shadow-black/20"
}
`}
            >

              {/* Alignment */}
              <div
                className="
                  flex
                  items-center
                  gap-1
                  border-b
                  border-white/10
                  bg-white/[0.02]
                  px-3
                  py-2
                "
              >
                {(
                  Object.keys(
                    alignmentIcons
                  ) as Alignment[]
                ).map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      onMouseDown={(
                        e
                      ) =>
                        e.preventDefault()
                      }
                      onClick={() =>
                        changeAlign(
                          item
                        )
                      }
                      className={alignButtonClass(
                        align === item
                      )}
                      aria-label={`Align ${ item } `}
                    >
                      <FontAwesomeIcon
                        icon={
                          alignmentIcons[
                            item
                          ]
                        }
                      />
                    </button>
                  )
                )}
              </div>

              {/* Editable Area */}
              <IonCardContent className="p-0">

                <div
                  ref={
                    editorRef
                  }
                  contentEditable
                  suppressContentEditableWarning
                  onFocus={() =>
                    setIsFocused(
                      true
                    )
                  }
                  onBlur={() =>
                    setIsFocused(
                      false
                    )
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
                <p className="text-xs text-gray-600">
                  Select text to format it,
                  then capture your quote.
                </p>
              </IonLabel>
            </IonItem>

          </div>

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

              select option {
  background: #18191d;
  color: white;
}

              .color-picker-modal {
  --background: #0f1115;
}

              .color-picker-modal ion-toolbar {
  --background: #0f1115;
  --color: white;
}

              .color-picker-modal ion-content {
  --background: #0f1115;
}
`}
          </style>

        </main>

      </IonContent>
    </IonPage>
  );
};

export default Home;
