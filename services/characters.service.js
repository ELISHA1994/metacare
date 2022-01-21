import axios from "axios";
import db from "../models/index.js";
import {fetchAllMovies, metaDataFn} from "../utils/utils.js";

const Comment = db.Comment;


export const moviesList = async () => {
    const result = await fetchAllMovies();
    let movielist = [];
    for (const element of result.sort(function (a, b) {
        return new Date(a.release_date) - new Date(b.release_date);
    })) {
        movielist.push({
            movie_name: element.title,
            opening_crawl: element.opening_crawl,
            comment_counts: await Comment.count({
                where: { movieUrl: element.url }
            })
        });
    }

    return movielist;
}

export const movieCharactersList = async (query_params) => {
    let { title, gender } = query_params;
    // title.replace(/[^a-zA-Z ]/g, " ");

    // Validate query params "title"
    if (title === undefined) {
        return {
            status: 400,
            message: "Bad request! Please input title query",
            body: {}
        }
    }
    if (title === "") {
        return {
            status: 400,
            message: "Title search term should not be empty!",
            body: {}
        }
    }

    const result = await fetchAllMovies();

    const titleQuery = title.toLowerCase();

    // movie
    const movie = result.find(movie => {
        const movieTitle = movie.title.toLowerCase()
        if(movieTitle.includes(titleQuery)){
            return movie
        }
    })

    if (movie === undefined) {
        return {
            status: 404,
            message: `No movie found with ${titleQuery} title `,
            body: {}
        }
    }

    const movieTitle = movie.title;
    const { sortName, sortHeight, sortGender } = query_params;
    // console.log("Query Params", sortName, sortHeight, sortGender);

    // Validate sort params "sortName" "sortHeight" & "sortGender"
    if (sortName !== undefined && sortHeight !== undefined && sortGender !== undefined) {
        return {
            status: 400,
            message: 'You can sort either name or height or gender per time',
            body: {}
        }
    }

    // Sorting by name further validation
    if (sortName !== undefined){
        if (sortName.toLowerCase() !== "a-z" && sortName.toLowerCase() !== "z-a") {
            return {
                status: 400,
                message: `Name can be sorted "a-z" - ascending or "z-a" - descending!`,
                body: {}
            }
        }
    }

    // Sorting by height further validation
    if(sortHeight !== undefined){
        if(sortHeight.toLowerCase() !== "asc" && sortHeight.toLowerCase() !== "desc") {
            return {
                status: 400,
                message: `Height can be sorted "asc" - ascending or "desc" - descending!`,
                body: {}
            }
        }
    }

    // Sorting by gender further validation
    if(sortGender !== undefined){
        if(sortGender.toLowerCase() !== "male" && sortGender.toLowerCase() !== "female") {
            return {
                status: 400,
                message: `Gender can be sorted "male" or "female"!!!!!`,
                body: {}
            }
        }
    }

    const responses = await Promise.all(movie.characters.map(async url => await axios.get(url)));
    const characters = responses.map(response => response.data);
    const metaDataValues = metaDataFn(characters);
    // console.log("characters", characters)

    // Validate filter query params "gender"
    if (gender === undefined) {
        // SORTING all characters of a specific movie
        if (sortName === undefined && sortHeight === undefined && sortGender === undefined) {
            let characterslist = [];
            for (const character of characters) {
                characterslist.push({
                    name: character.name,
                    height: character.height,
                    mass: character.mass,
                    hair_color: character.hair_color,
                    skin_color: character.skin_color,
                    eye_color: character.eye_color,
                    birth_year: character.birth_year,
                    gender: character.gender
                })
            }
            return {
                status: 200,
                message: `Characters  list fetch successfully`,
                body: {
                    movie: movieTitle,
                    metaData: metaDataValues,
                    characters: characterslist
                }
            }
        }

        // SORTING all characters of a specific movie by Name
        if (sortName !== undefined && sortHeight === undefined && sortGender === undefined) {
            let charSortName = [];
            for (const character of characters.sort((a, b) => {
                if (sortName.toLowerCase() === 'a-z') {
                    return a.name.localeCompare(b.name);
                } else {
                    return b.name.localeCompare(a.name);
                }
            })) {
                charSortName.push({
                    name: character.name,
                    height: character.height,
                    mass: character.mass,
                    hair_color: character.hair_color,
                    skin_color: character.skin_color,
                    eye_color: character.eye_color,
                    birth_year: character.birth_year,
                    gender: character.gender
                })
            }

            return {
                status: 200,
                message: `Characters list fetch successfully`,
                body: {
                    movie: movieTitle,
                    metaData: metaDataValues,
                    characters: charSortName
                }
            }
        }

        // SORTING all characters of a specific movie by characters Height
        if (sortHeight !== undefined && sortName === undefined && sortGender === undefined) {
            let charSortHeight = [];
            for (const character of characters.sort((a, b) => {
                if (sortHeight.toLowerCase() === 'asc') {
                    return parseInt(a.height) - parseInt(b.height)
                } else {
                    return parseInt(b.height) - parseInt(a.height)
                }
            })) {
                charSortHeight.push({
                    name: character.name,
                    height: character.height,
                    mass: character.mass,
                    hair_color: character.hair_color,
                    skin_color: character.skin_color,
                    eye_color: character.eye_color,
                    birth_year: character.birth_year,
                    gender: character.gender
                })
            }

            return {
                status: 200,
                message: `Characters  list fetch successfully`,
                body: {
                    movie: movieTitle,
                    metaData: metaDataValues,
                    characters: charSortHeight
                }
            }
        }

        // SORTING all characters of a specific movie by characters Gender
        if (sortGender !== undefined && sortName === undefined && sortHeight === undefined) {
            let charSortGender = [];
            for (const character of characters.sort((a, b) => {
                if (sortGender.toLowerCase() === 'male') {
                    if(a.gender > b.gender){
                        return -1;
                    }

                    else if(a.gender < b.gender){
                        return 1;
                    }else{
                        return 0;
                    }
                } else {
                    if(a.gender < b.gender){
                        return -1;
                    }

                    if(a.gender > b.gender){
                        return 1;
                    }

                    return 0;
                }
            })) {
                charSortGender.push({
                    name: character.name,
                    height: character.height,
                    mass: character.mass,
                    hair_color: character.hair_color,
                    skin_color: character.skin_color,
                    eye_color: character.eye_color,
                    birth_year: character.birth_year,
                    gender: character.gender
                })
            }

            return {
                status: 200,
                message: `Characters  list fetch successfully`,
                body: {
                    movie: movieTitle,
                    metaData: metaDataValues,
                    characters: charSortGender
                }
            }
        }
    }
    if (gender.toLowerCase() !== 'male' && gender.toLowerCase() !== 'female') {
        return {
            status: 400,
            message: `Gender query's value is either "male" or "female"!`,
            body: {}
        }
    }

    // (gender !== undefined) ==> &gender=male/female
    const charactersByGender = characters.filter(character => character.gender === gender.toLowerCase());
    const metaDataByGender = metaDataFn(charactersByGender);

    // SORTING List of characters by gender of a specific movie
    if (sortName === undefined && sortHeight === undefined && sortGender === undefined) {
        const characterListByGender = [];

        for (const character of charactersByGender) {
            characterListByGender.push({
                name: character.name,
                height: character.height,
                mass: character.mass,
                hair_color: character.hair_color,
                skin_color: character.skin_color,
                eye_color: character.eye_color,
                birth_year: character.birth_year,
                gender: character.gender
            })
        }
        return {
            status: 200,
            message: `Characters  list fetch successfully`,
            body: {
                movie: movieTitle,
                metaData: metaDataByGender,
                characters: characterListByGender
            }
        }
    }

    // SORTING all characters by gender of a specific movie by Name
    if (sortName !== undefined && sortHeight === undefined && sortGender === undefined) {
        const charSortName = [];

        for (const character of charactersByGender.sort((a, b) => {
            if (sortName.toLowerCase() === 'a-z') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        })) {
            charSortName.push({
                name: character.name,
                height: character.height,
                mass: character.mass,
                hair_color: character.hair_color,
                skin_color: character.skin_color,
                eye_color: character.eye_color,
                birth_year: character.birth_year,
                gender: character.gender
            })
        }
        return {
            status: 200,
            message: `Characters  list fetch and sorted by Name successfully`,
            body: {
                movie: movieTitle,
                metaData: metaDataByGender,
                characters: charSortName
            }
        }
    }

    // SORTING all characters by gender of a specific movie by characters Height
    if (sortHeight !== undefined && sortName === undefined && sortGender === undefined) {
        const charSortHeight = [];

        for (const character of charactersByGender.sort((a, b) => {
            if (sortHeight.toLowerCase() === 'asc') {
                return parseInt(a.height) - parseInt(b.height)
            } else {
                return parseInt(b.height) - parseInt(a.height)
            }
        })) {
            charSortHeight.push({
                name: character.name,
                height: character.height,
                mass: character.mass,
                hair_color: character.hair_color,
                skin_color: character.skin_color,
                eye_color: character.eye_color,
                birth_year: character.birth_year,
                gender: character.gender
            })
        }

        return {
            status: 200,
            message: `Characters  list fetch and sorted by Height successfully`,
            body: {
                movie: movieTitle,
                metaData: metaDataByGender,
                characters: charSortHeight
            }
        }
    }

}

