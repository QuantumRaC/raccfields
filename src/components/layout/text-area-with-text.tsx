import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface TextareaWithTextProps {
    id: string
    label: string
    placeholder?: string
    helperText?: string
    value: string
    buttonId: string
    buttonText: string
    onChange: (value: string) => void
    onButtonClick: () => void
}

const TextareaWithText = ({
    id,
    label,
    placeholder,
    helperText,
    value,
    buttonId,
    buttonText,
    onChange,
    onButtonClick,
}: TextareaWithTextProps) => {
    return (
        <div className="w-full gap-3">
            <Label htmlFor={id} className="text-md font-mono font-bold ml-2 mb-2 text-foreground">{label}</Label>
            <Textarea
                id={id}
                placeholder={placeholder}
                className="font-mono text-xs"
                value={value}
                onChange={(e) => {
                    console.log("Event target value:", e.target.value)
                    onChange(e.target.value)
                }}
            />
            {helperText && (
                <p className="text-muted-foreground text-sm mt-2 mb-4">{helperText}</p>
            )}
            <Button
                id={buttonId}
                onClick={onButtonClick}
            >
                {buttonText}
            </Button>
        </div>
    )
}

export default TextareaWithText
