"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var dotenv = require("dotenv");
var path_1 = require("path");
// Load the .env file using resolve to ensure the path is correct
dotenv.config({ path: (0, path_1.resolve)(__dirname, "../.env") });
var apiKey = process.env.SECRET_KEY;
if (!apiKey) {
    throw new Error("API key is missing. Check your .env file.");
}
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
        });
    });
}
function getTop50PopularPlaces(lat, lng, cityName) {
    return __awaiter(this, void 0, void 0, function () {
        var url, places, nextPageToken, requestUrl, response, top50Places, popularPlaces, i, place, detailsUrl, detailsResponse, placeDetails, description, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=".concat(lat, ",").concat(lng, "&radius=5000&key=").concat(apiKey, "&types=establishment");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 11, , 12]);
                    places = [];
                    nextPageToken = undefined;
                    _a.label = 2;
                case 2:
                    requestUrl = nextPageToken
                        ? "".concat(url, "&pagetoken=").concat(nextPageToken)
                        : url;
                    return [4 /*yield*/, axios_1.default.get(requestUrl)];
                case 3:
                    response = _a.sent();
                    if (!response.data || !response.data.results) {
                        throw new Error("Failed to fetch places data.");
                    }
                    places.push.apply(places, response.data.results);
                    nextPageToken = response.data.next_page_token;
                    if (!nextPageToken) return [3 /*break*/, 5];
                    return [4 /*yield*/, sleep(2000)];
                case 4:
                    _a.sent(); // Google API requires a delay before using next_page_token
                    _a.label = 5;
                case 5:
                    if (nextPageToken && places.length < 50) return [3 /*break*/, 2];
                    _a.label = 6;
                case 6:
                    top50Places = places
                        .filter(function (place) { return !place.name.toLowerCase().includes(cityName.toLowerCase()); })
                        .sort(function (a, b) { return (b.rating || 0) - (a.rating || 0); })
                        .slice(0, 50);
                    popularPlaces = {};
                    i = 0;
                    _a.label = 7;
                case 7:
                    if (!(i < top50Places.length)) return [3 /*break*/, 10];
                    place = top50Places[i];
                    detailsUrl = "https://maps.googleapis.com/maps/api/place/details/json?place_id=".concat(place.place_id, "&key=").concat(apiKey);
                    return [4 /*yield*/, axios_1.default.get(detailsUrl)];
                case 8:
                    detailsResponse = _a.sent();
                    if (!detailsResponse.data || !detailsResponse.data.result) {
                        throw new Error("Failed to fetch details for place ID: ".concat(place.place_id));
                    }
                    placeDetails = detailsResponse.data.result;
                    description = (placeDetails === null || placeDetails === void 0 ? void 0 : placeDetails.overview) || "No description available";
                    popularPlaces["Place ".concat(i + 1)] = {
                        name: place.name,
                        rating: place.rating || 0,
                        description: description,
                    };
                    _a.label = 9;
                case 9:
                    i++;
                    return [3 /*break*/, 7];
                case 10: return [2 /*return*/, popularPlaces];
                case 11:
                    error_1 = _a.sent();
                    if (error_1 instanceof Error) {
                        console.error("Error getting places:", error_1.message);
                    }
                    else {
                        console.error("Unexpected error:", error_1);
                    }
                    return [2 /*return*/, {}];
                case 12: return [2 /*return*/];
            }
        });
    });
}
// Example usage
getTop50PopularPlaces(40.7128, -74.0060, "New York").then(function (places) {
    console.log(places);
});
