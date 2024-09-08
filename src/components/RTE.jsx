import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full mb-6">
      {label && (
        <label className="block text-lg font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey="esuy8ev4v9mw5zr8wr7f7w3m492gqg2bh9qmyhcszkuykbus" // Replace with your TinyMCE API key
            initialValue={defaultValue}
            init={{
              height: 400,
              menubar: false,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              setup: (editor) => {
                editor.on("Change", () => {
                  onChange(editor.getContent());
                });
                editor.on("init", () => {
                  editor.setContent(value || defaultValue);
                });
              },
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
