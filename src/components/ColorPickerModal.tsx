import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { useState } from "react";

import {
  restoreSelection,
} from "../utils/editorSelection";

type ColorMode = "text" | "underline";

interface ColorPickerModalProps {
  isOpen: boolean;
  mode: ColorMode;
  onClose: () => void;
  onApply: (color: string) => void;
}

const colors = [
  "#ffffff",
  "#000000",

  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#eab308",

  "#22c55e",
  "#14b8a6",
  "#06b6d4",
  "#3b82f6",

  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#ec4899",

  "#f43f5e",
  "#64748b",
];

const ColorPickerModal: React.FC<ColorPickerModalProps> = ({
  isOpen, mode, onClose, onApply,
}) => {
  const [customColor, setCustomColor] =
    useState("#22c55e");

  const handleApply = (
    color: string
  ) => {
    restoreSelection();

    onApply(color);
    onClose();
  };

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      breakpoints={[0, 0.45, 0.7]}
      initialBreakpoint={0.45}
      className="color-picker-modal"
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {mode === "text"
              ? "Text Color"
              : "Underline Color"}
          </IonTitle>

          <IonButtons slot="end">
            <IonButton onClick={onClose}>
              Cancel
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="mx-auto w-full max-w-md">

          {/* Preset Colors */}
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() =>
                  handleApply(color)
                }
                aria-label={`Use color ${ color } `}
                className="
                  group
                  relative
                  aspect-square
                  rounded-2xl
                  border
                  border-white/10
                  p-1
                  transition-all
                  duration-200
                  hover:scale-105
                  hover:border-white/30
                  active:scale-95
                "
              >
                <span
                  className="block h-full w-full rounded-xl"
                  style={{
                    backgroundColor: color,
                  }}
                />

                {/* White color checker */}
                {color === "#ffffff" && (
                  <span className="pointer-events-none absolute inset-1 rounded-xl border border-black/10" />
                )}
              </button>
            ))}
          </div>

          {/* Custom Color */}
          <div className="mt-8">

            <p className="mb-3 text-sm font-medium text-gray-400">
              Custom color
            </p>

            <div className="flex items-center gap-3">

              <input
                type="color"
                value={customColor}
                onChange={(e) =>
                  setCustomColor(
                    e.target.value
                  )
                }
                className="
                  h-11
                  w-14
                  cursor-pointer
                  rounded-xl
                  border-0
                  bg-transparent
                "
              />

              <IonInput
                value={customColor}
                onIonInput={(e) =>
                  setCustomColor(
                    e.detail.value ?? "#22c55e"
                  )
                }
                placeholder="#22c55e"
                className="
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  px-3
                "
              />

              <IonButton
                onClick={() =>
                  handleApply(customColor)
                }
              >
                Apply
              </IonButton>

            </div>

          </div>

        </div>
      </IonContent>
    </IonModal>
  );
};

export default ColorPickerModal;
