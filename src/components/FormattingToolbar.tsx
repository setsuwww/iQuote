import {
  faAlignLeft,
  faBold,
  faFillDrip,
  faItalic,
  faPalette,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ColorPickerModal from "./ColorPickerModal";

import {
  saveSelection,
} from "../utils/editorSelection";

import { useState } from "react";

interface FormattingToolbarProps {
  editorRef: React.RefObject<HTMLDivElement | null>;

  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;

  font: string;

  onToggleFormat: (
    command: "bold" | "italic" | "underline",
    current: boolean,
    setter: (value: boolean) => void
  ) => void;

  onChangeFont: (value: string) => void;

  setIsBold: (value: boolean) => void;
  setIsItalic: (value: boolean) => void;
  setIsUnderline: (value: boolean) => void;

  fonts: { label: string; value: string }[];
}

type ColorMode = | "text" | "underline";

const FormattingToolbar: React.FC<
  FormattingToolbarProps
> = ({
  editorRef,
  isBold,
  isItalic,
  isUnderline,
  font,
  onToggleFormat,
  onChangeFont,
  setIsBold,
  setIsItalic,
  setIsUnderline,
  fonts,
}) => {
  const [
    colorModalOpen,
    setColorModalOpen,
  ] = useState(false);

  const [
    colorMode,
    setColorMode,
  ] = useState<ColorMode>("text");

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

  const openColorPicker = (
    mode: ColorMode
  ) => {
    /*
     * Simpan selection SEBELUM modal dibuka.
     *
     * Contoh:
     * "HAI ANDO"
     *       ^^^^
     */
    saveSelection();

    setColorMode(mode);
    setColorModalOpen(true);
  };

  const applyTextColor = (
    color: string
  ) => {
    editorRef.current?.focus();

    execCommand(
      "foreColor",
      color
    );
  };

  const applyUnderlineColor = (
    color: string
  ) => {
    editorRef.current?.focus();

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

    if (range.collapsed) {
      return;
    }

    const span =
      document.createElement(
        "span"
      );

    span.style.textDecorationColor =
      color;

    span.style.textDecorationLine =
      "underline";

    /*
     * Kalau text belum underline,
     * sekalian aktifkan underline.
     */
    span.style.textDecorationStyle =
      "solid";

    try {
      range.surroundContents(span);
    } catch {
      /*
       * surroundContents bisa gagal
       * ketika selection memotong
       * beberapa node.
       *
       * Fallback menggunakan
       * extractContents.
       */
      const contents =
        range.extractContents();

      span.appendChild(contents);

      range.insertNode(span);
    }

    selection.removeAllRanges();

    const newRange =
      document.createRange();

    newRange.selectNodeContents(
      span
    );

    selection.addRange(
      newRange
    );

    setIsUnderline(true);
  };

  const handleColorApply = (
    color: string
  ) => {
    if (colorMode === "text") {
      applyTextColor(color);
      return;
    }

    applyUnderlineColor(color);
  };

  const toolbarButtonClass = (
    active: boolean
  ) =>
    `
flex
h - 9
w - 9
items - center
justify - center
rounded - full
text - sm
transition - all
duration - 200
active: scale - 90
      ${
    active
        ? "bg-white/15 text-white shadow-sm"
        : "text-gray-400 hover:bg-white/10 hover:text-white"
}
`;

  return (
    <>
      <div
        className="
          sticky
          top-4
          z-20
          mx-auto
          flex
          w-fit
          max-w-full
          items-center
          gap-1
          rounded-full
          border-b
          border-white/10
          bg-white/5
          p-1.5
          shadow-2xl
          shadow-black/30
          ring
          ring-white/20
          backdrop-blur-xl
          backdrop-saturate-150
        "
      >

        {/* Bold */}
        <button
          type="button"
          onMouseDown={(e) =>
            e.preventDefault()
          }
          onClick={() =>
            onToggleFormat(
              "bold",
              isBold,
              setIsBold
            )
          }
          className={toolbarButtonClass(
            isBold
          )}
          aria-label="Bold"
        >
          <FontAwesomeIcon
            icon={faBold}
          />
        </button>

        {/* Italic */}
        <button
          type="button"
          onMouseDown={(e) =>
            e.preventDefault()
          }
          onClick={() =>
            onToggleFormat(
              "italic",
              isItalic,
              setIsItalic
            )
          }
          className={toolbarButtonClass(
            isItalic
          )}
          aria-label="Italic"
        >
          <FontAwesomeIcon
            icon={faItalic}
          />
        </button>

        {/* Underline */}
        <button
          type="button"
          onMouseDown={(e) =>
            e.preventDefault()
          }
          onClick={() =>
            onToggleFormat(
              "underline",
              isUnderline,
              setIsUnderline
            )
          }
          className={toolbarButtonClass(
            isUnderline
          )}
          aria-label="Underline"
        >
          <FontAwesomeIcon
            icon={faUnderline}
          />
        </button>

        {/* Divider */}
        <div className="mx-1 h-5 w-px bg-white/10" />

        {/* Text Color */}
        <button
          type="button"
          onMouseDown={(e) =>
            e.preventDefault()
          }
          onClick={() =>
            openColorPicker(
              "text"
            )
          }
          className={toolbarButtonClass(
            false
          )}
          aria-label="Text color"
        >
          <FontAwesomeIcon
            icon={faPalette}
          />
        </button>

        {/* Underline Color */}
        <button
          type="button"
          onMouseDown={(e) =>
            e.preventDefault()
          }
          onClick={() =>
            openColorPicker(
              "underline"
            )
          }
          className={toolbarButtonClass(
            false
          )}
          aria-label="Underline color"
        >
          <FontAwesomeIcon
            icon={faFillDrip}
          />
        </button>

        {/* Divider */}
        <div className="mx-1 h-5 w-px bg-white/10" />

        {/* Font */}
        <select
          value={font}
          onChange={(e) =>
            onChangeFont(
              e.target.value
            )
          }
          className="
            h-9
            max-w-32
            appearance-none
            rounded-full
            bg-transparent
            px-3
            text-sm
            text-gray-300
            outline-none
            transition
            hover:bg-white/10
            focus:text-white
          "
          aria-label="Font"
        >
          {fonts.map((item) => (
            <option
              key={item.value}
              value={item.value}
              className="bg-[#18191d] text-white"
            >
              {item.label}
            </option>
          ))}
        </select>

      </div>

      <ColorPickerModal
        isOpen={
          colorModalOpen
        }
        mode={colorMode}
        onClose={() =>
          setColorModalOpen(false)
        }
        onApply={
          handleColorApply
        }
      />
    </>
  );
};

export default FormattingToolbar;
