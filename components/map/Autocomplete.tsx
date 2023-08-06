import {
    Autocomplete as MuiAutocomplete,
    AutocompleteProps as MuiAutocompleteProps,
    TextField
} from "@mui/material"
import { useCallback, useEffect, useState } from "react"


export interface AutocompleteProps {
    className?: string
    label?: string
    onChosen?: (address: {
        id: string,
        label: string,
        matched_substrings: string,
        terms: string,
    }) => void
}


const Autocomplete = ({ className, label, onChosen }: AutocompleteProps) => {
    const [value, setValue] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [suggestion, setSuggestion] = useState<any[]>([]);


    const displaySuggestions: any = useCallback((
        predictions: google.maps.places.QueryAutocompletePrediction[] | null,
        status: google.maps.places.PlacesServiceStatus
    ) => {
        if (status === 'OK') setSuggestion(predictions?.map(item => ({
            id: item.place_id,
            label: item.description,
            matched_substrings: item.matched_substrings,
            terms: item.terms,
        })) || [])
    }, [inputValue])


    useEffect(() => {
        if (inputValue && google?.maps?.places?.AutocompleteService) {
            const service = new google.maps.places.AutocompleteService()
            
            service.getQueryPredictions({ input: inputValue }, displaySuggestions)
        }
    }, [inputValue])


    return (
        <MuiAutocomplete
            className={className}
            value={value}
            onChange={(event: any, newValue: string | null) => {
                setValue(newValue)
                if(onChosen) onChosen(newValue as any)
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            options={suggestion}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label={label} variant="standard" />}
        />
    )
}


export default Autocomplete