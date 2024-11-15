import express from 'express';
const router = express.Router();

//all genres from TMDB API
const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" }
];

//years from 1970 to current year
const currentYear = new Date().getFullYear();
const releaseYears = Array.from({ length: currentYear - 1970 + 1 }, (_, i) => 1970 + i);

//all cinemas from Finnkino API
const cinemas = [
    { id: 1029, name: "Valitse alue/teatteri" },
    { id: 1014, name: "Pääkaupunkiseutu" },
    { id: 1012, name: "Espoo" },
    { id: 1039, name: "Espoo: OMENA" },
    { id: 1038, name: "Espoo: SELLO" },
    { id: 1002, name: "Helsinki" },
    { id: 1045, name: "Helsinki: ITIS" },
    { id: 1031, name: "Helsinki: KINOPALATSI" },
    { id: 1032, name: "Helsinki: MAXIM" },
    { id: 1033, name: "Helsinki: TENNISPALATSI" },
    { id: 1013, name: "Vantaa: FLAMINGO" },
    { id: 1015, name: "Jyväskylä: FANTASIA" },
    { id: 1016, name: "Kuopio: SCALA" },
    { id: 1017, name: "Lahti: KUVAPALATSI" },
    { id: 1041, name: "Lappeenranta: STRAND" },
    { id: 1018, name: "Oulu: PLAZA" },
    { id: 1019, name: "Pori: PROMENADI" },
    { id: 1021, name: "Tampere" },
    { id: 1034, name: "Tampere: CINE ATLAS" },
    { id: 1035, name: "Tampere: PLEVNA" },
    { id: 1047, name: "Turku ja Raisio" },
    { id: 1022, name: "Turku: KINOPALATSI" },
    { id: 1046, name: "Raisio: LUXE MYLLY" }
];

//regions and their cinemas from Finnkino API
const regions = [
    {
        name: "Helsinki",
        cinemas: [
            { id: 1002, name: "Helsinki" },
            { id: 1045, name: "Helsinki: ITIS" },
            { id: 1031, name: "Helsinki: KINOPALATSI" },
            { id: 1032, name: "Helsinki: MAXIM" },
            { id: 1033, name: "Helsinki: TENNISPALATSI" }
        ]
    },
    {
        name: "Espoo",
        cinemas: [
            { id: 1012, name: "Espoo" },
            { id: 1039, name: "Espoo: OMENA" },
            { id: 1038, name: "Espoo: SELLO" }
        ]
    },
    {
        name: "Vantaa",
        cinemas: [
            { id: 1013, name: "FLAMINGO" }
        ]
    },
    {
        name: "Jyväskylä",
        cinemas: [
            { id: 1015, name: "FANTASIA" }
        ]
    },
    {
        name: "Kuopio",
        cinemas: [
            { id: 1016, name: "SCALA" }
        ]
    },
    {
        name: "Lahti",
        cinemas: [
            { id: 1017, name: "KUVAPALATSI" }
        ]
    },
    {
        name: "Lappeenranta",
        cinemas: [
            { id: 1041, name: "STRAND" }
        ]
    },
    {
        name: "Oulu",
        cinemas: [
            { id: 1018, name: "PLAZA" }
        ]
    },
    {
        name: "Pori",
        cinemas: [
            { id: 1019, name: "PROMENADI" }
        ]
    },
    {
        name: "Tampere",
        cinemas: [
            { id: 1021, name: "Tampere" },
            { id: 1034, name: "CINE ATLAS" },
            { id: 1035, name: "PLEVNA" }
        ]
    },
    {
        name: "Turku ja Raisio",
        cinemas: [
            { id: 1047, name: "Turku ja Raisio" },
            { id: 1022, name: "KINOPALATSI" },
            { id: 1046, name: "LUXE MYLLY" }
        ]
    }
];

router.get('/regions', (req, res) => {
    res.json(regions);
});

router.get('/genres', (req, res) => {
    res.json(genres);
});

router.get('/release-years', (req, res) => {
    res.json(releaseYears);
});

router.get('/cinemas', (req, res) => {
    res.json(cinemas);
});