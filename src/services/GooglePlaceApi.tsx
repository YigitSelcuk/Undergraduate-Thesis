import Config from "react-native-config";

export const GetPhotoRef = async (placeName: string): Promise<void> => {
    try {
        const resp = await fetch(
            `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${placeName}&key=${Config.GOOGLE_MAP_KEY}`
        );

        const result = await resp.json();
        return result;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
