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
var dotenv = require("dotenv");
var path_1 = require("path");
var axios_1 = require("axios");
dotenv.config({ path: (0, path_1.resolve)(__dirname, '../.env') });
function loadGoogleApiKey() {
    var GAPIKey = process.env.SECRET_KEY;
    if (!GAPIKey)
        throw new Error('API key is missing. Check your .env file.');
    return GAPIKey;
}
function fetchCityPictureUrl(apiKey, cityName) {
    return __awaiter(this, void 0, void 0, function () {
        var searchUrl, searchResponse, searchData, placeId, detailsUrl, detailsResponse, detailsData, photoReference, photoUrl, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    searchUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=".concat(encodeURIComponent(cityName), "&key=").concat(apiKey);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, axios_1.default.get(searchUrl)];
                case 2:
                    searchResponse = _a.sent();
                    searchData = searchResponse.data;
                    if (!searchData.results || searchData.results.length === 0)
                        throw new Error("No results found for the city: ".concat(cityName));
                    placeId = searchData.results[0].place_id;
                    detailsUrl = "https://maps.googleapis.com/maps/api/place/details/json?place_id=".concat(placeId, "&fields=photos&key=").concat(apiKey);
                    return [4 /*yield*/, axios_1.default.get(detailsUrl)];
                case 3:
                    detailsResponse = _a.sent();
                    detailsData = detailsResponse.data;
                    if (!detailsData.result.photos || detailsData.result.photos.length === 0)
                        throw new Error("No photos available for the city: ".concat(cityName));
                    photoReference = detailsData.result.photos[0].photo_reference;
                    photoUrl = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=".concat(photoReference, "&key=").concat(apiKey);
                    return [2 /*return*/, photoUrl];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error fetching city picture:", error_1);
                    throw error_1;
                case 5: return [2 /*return*/];
            }
        });
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var key, photoUrl, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                key = loadGoogleApiKey();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fetchCityPictureUrl(key, "New York")];
            case 2:
                photoUrl = _a.sent();
                console.log(photoUrl);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                if (error_2 instanceof Error) {
                    console.error("Error:", error_2.message);
                }
                else {
                    console.error("Unexpected error:", error_2);
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); })();
