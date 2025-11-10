import { useId } from "react";

export default function FilePicker({
    labelText,
    name = "archivo",
    required = false,
    accept = ".zip,.rar",
    multiple = false,
    error,
    onChange,
    className = "",
}) {
    const uid = useId();
    const inputId = `${uid}-${name}`;

    return (
        <div className={`max-w-sm w-full space-y-2 ${className}`}>
            <label htmlFor={inputId} className="text-sm font-medium">
                {labelText} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                id={inputId}
                name={name}
                type="file"
                required={required}
                accept={accept}
                multiple={multiple}
                aria-invalid={!!error}
                aria-describedby={error ? `${inputId}-error` : undefined}
                onChange={(e) => {
                    const files = Array.from(e.currentTarget.files ?? []);
                    onChange?.(files);
                }}
                className={`block w-full text-sm file:mr-3 file:rounded-lg file:border-0
                            file:bg-primary file:px-3 file:py-2 file:text-white
                            hover:file:bg-primary-600 file:transition-all file:cursor-pointer ${error ? "ring-2 ring-red-600 rounded-lg" : ""}`}
            />

            {error && (
                <p id={`${inputId}-error`} className="text-xs text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}