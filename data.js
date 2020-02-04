const data = [
    {
        source: require("./src/Components/Image/user_1.jpg"),
        width: 1080,
        height: 1920,
        id: idGenerator(),
        title: "Jannatul Ferdous Peya"
    },
    {
        source: require("./src/Components/Image/user.jpg"),
        dimensions: { width: 1080, height: 1300 },
        id: idGenerator(),
        title: "Jannatul Ferdous Peya",
    },
    {
        source: require("./src/Components/Image/profile_single_images.jpg"),
        dimensions: { width: 1080, height: 1920 },
        id: idGenerator(),
        title: "Nusrat Faria",
    },
    {
        source: require("./src/Components/Image/beautiful-blond-blonde-hair.jpg"),
        id: idGenerator(),
        title: "Peya Bipasha",
        dimensions: { width: 1080, height: 1920 },
    },
    {
        source: require("./src/Components/Image/adult-arm-art.jpg"),
        id: idGenerator(),
        title: "Runa Khan",
        dimensions: { width: 1080, height: 1920 },
    },
    {
        url: "https://luehangs.site/pic-chat-app-images/beautiful-blond-fishnet-stockings-48134.jpg",
        id: idGenerator(),
        title: "www.luehangs.site",
        // dimensions: { width: 1080, height: 1920 },
    },
    {
        URL: "https://luehangs.site/pic-chat-app-images/adult-arm-art-326559.jpg",
        id: idGenerator(),
        title: "www.luehangs.site",
        // dimensions: { width: 1920, height: 1080 },
    },
    {
        uri: "https://luehangs.site/pic-chat-app-images/attractive-balance-beautiful-186263.jpg",
        id: idGenerator(),
        title: "www.luehangs.site",
        // dimensions: { width: 1920, height: 1080 },
    },
    {
        uri: "https://luehangs.site/pic-chat-app-images/pexels-photo-247292.jpeg",
        id: idGenerator(),
        title: "www.luehangs.site",
        // dimensions: { width: 1920, height: 1080 },
    },
    {
        uri: "https://luehangs.site/pic-chat-app-images/pexels-photo-846741.jpeg",
        id: idGenerator(),
        title: "www.luehangs.site",
        // dimensions: { width: 1920, height: 1080 },
    },
    {
        uri: "https://luehangs.site/pic-chat-app-images/beautiful-daylight-dress-459947.jpg",
        id: idGenerator(),
        title: "www.luehangs.site",
        // dimensions: { width: 1080, height: 1920 },
    },
    {
        uri: "https://luehangs.site/pic-chat-app-images/free-freedom-girl-6480.jpg",
        id: idGenerator(),
        title: "www.luehangs.site",
        // dimensions: { width: 1080, height: 1920 },
    },
    {
        uri: "https://luehangs.site/pic-chat-app-images/hair-girl-female-model.jpg",
        id: idGenerator(),
        title: "www.luehangs.site",
        // dimensions: { width: 1080, height: 1920 },
    },
    {
        uri: "https://luehangs.site/pic-chat-app-images/pexels-photo-853168.jpeg",
        id: idGenerator(),
        title: "www.luehangs.site",
        // dimensions: { width: 1920, height: 1080 },
    },
    {
        uri: "https://luehangs.site/pic-chat-app-images/pexels-photo-904276.jpeg",
        id: idGenerator(),
        title: "www.luehangs.site",
        // dimensions: { width: 1920, height: 1080 },
    },
    {
        uri: "https://luehangs.site/pic-chat-app-images/pexels-photo-1059116.jpeg",
        id: idGenerator(),
        title: "www.luehangs.site",
        // dimensions: { width: 1920, height: 1080 },
    },
    {
        uri: "https://luehangs.site/pic-chat-app-images/photo-206330.jpeg",
        id: idGenerator(),
        title: "www.luehangs.site",
        // dimensions: { width: 1080, height: 1920 },
    },
    {
        uri: "https://luehangs.site/pic-chat-app-images/photo-206381.jpeg",
        id: idGenerator(),
        title: "www.luehangs.site",
        // dimensions: { width: 1080, height: 1920 },
    },
    {
        uri: "https://luehangs.site/pic-chat-app-images/photo-755745.jpeg",
        id: idGenerator(),
        title: "www.luehangs.site",
        // dimensions: { width: 1080, height: 1920 },
    },
    {
        uri: "https://luehangs.site/pic-chat-app-images/pexels-photo-1104114.jpeg",
        id: idGenerator(),
        title: "www.luehangs.site",
        // dimensions: { width: 1920, height: 1080 },
    },
    {
        uri: "https://luehangs.site/pic-chat-app-images/photo-274595.jpeg",
        id: idGenerator(),
        title: "www.luehangs.site",
        // dimensions: { width: 1080, height: 1920 },
    },
    {
        uri: "https://luehangs.site/pic-chat-app-images/photo-799443.jpeg",
        id: idGenerator(),
        title: "www.luehangs.site",
        // dimensions: { width: 1080, height: 1920 },
    }
];

function idGenerator() {
    return Math.random().toString(36).substr(2, 9);
}

module.exports = data;