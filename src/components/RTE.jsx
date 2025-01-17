import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import conf from "../conf/conf";

export default function RTE({ name, control, label, defaultValue = "" }) {
  const customContentStyle = `
    body {
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 15px;
      line-height: 1.6;
      color: #E5E7EB;
      background: #1F2937;
      margin: 1rem;
      min-height: 300px;
    }
    body.mce-content-body[data-mce-placeholder]:not([contenteditable="false"]):before {
      color: #6B7280;
    }
  `;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-200 mb-2">
          {label}
        </label>
      )}
      <div className="relative rounded-xl overflow-hidden border border-gray-700/50">
        <Controller
          name={name || "content"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Editor
              apiKey={conf.tinyEditorKey}
              initialValue={defaultValue}
              init={{
                height: 400,
                menubar: false,
                skin: "oxide-dark",
                content_css: "dark",
                plugins: ["lists", "link", "image", "help"],
                toolbar:
                  "undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist | link image | help",
                content_style: customContentStyle,
                statusbar: false,
                toolbar_sticky: false,
                content_css: false,
                placeholder: "Write something...",
                resize: false,
                branding: false,
                elementpath: false,
                setup: (editor) => {
                  editor.on("Change", () => {
                    onChange(editor.getContent());
                  });
                  editor.on("init", () => {
                    editor.setContent(value || defaultValue);
                  });
                  // Custom CSS for dark theme styling
                  editor.on("init", function () {
                    const css = `
                      .tox.tox-tinymce {
                        border: none !important;
                        background-color: #1F2937 !important;
                      }
                      .tox .tox-toolbar__primary {
                        background: #1A1F33 !important;
                        border-bottom: 1px solid rgba(75, 85, 99, 0.2) !important;
                        padding: 4px !important;
                      }
                      .tox .tox-toolbar__group {
                        border: none !important;
                        padding: 0 2px !important;
                      }
                      .tox .tox-tbtn {
                        width: 32px !important;
                        height: 32px !important;
                        margin: 0 1px !important;
                        border-radius: 4px !important;
                        color: #E5E7EB !important;
                      }
                      .tox .tox-tbtn:hover {
                        background: rgba(255, 255, 255, 0.05) !important;
                      }
                      .tox .tox-tbtn--enabled {
                        background: rgba(255, 255, 255, 0.1) !important;
                      }
                      .tox .tox-tbtn--enabled:hover {
                        background: rgba(255, 255, 255, 0.15) !important;
                      }
                      .tox .tox-tbtn svg {
                        fill: #9CA3AF !important;
                      }
                      .tox .tox-edit-area__iframe {
                        background-color: #171C2E !important;
                      }
                      .tox.tox-tinymce--toolbar-sticky-off {
                        padding: 0 !important;
                      }
                    `;
                    const style = editor.dom.create(
                      "style",
                      { type: "text/css" },
                      css
                    );
                    editor.dom.doc
                      .getElementsByTagName("head")[0]
                      .appendChild(style);
                  });
                },
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </div>
      <div className="text-xs text-gray-500 mt-1">Press Alt+0 for help</div>
    </div>
  );
}
