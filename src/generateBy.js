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
exports.generateBasedOnLocation = generateBasedOnLocation;
var google_reccomendations_1 = require("./google_reccomendations");
var location_getter_1 = require("./location_getter");
// const places = [
//   { name: "Eiffel Tower", description: "An iconic Paris landmark offering stunning views.", image: "https://quiltripping.com/wp-content/uploads/2017/07/DSC_0781-scaled.jpg" },
//   { name: "Statue of Liberty", description: "A symbol of freedom in New York Harbor.", image: "https://cdn.britannica.com/31/94231-050-C6B60B89/Statue-of-Liberty-Island-Upper-New-York.jpg" },
//   { name: "Great Wall of China", description: "A magnificent ancient structure stretching across China.", image: "https://cdn.britannica.com/82/94382-050-20CF23DB/Great-Wall-of-China-Beijing.jpg" },
//   { name: "Big Ben", description: "A famous clock tower in London.", image: "https://storage.googleapis.com/mari-a5cc7.appspot.com/photos/regular/ef0d6b06-e455-4b0a-ad5f-c88769c6bc9c.jpg" },
//   { name: "Colosseum", description: "A Roman amphitheater in Rome.", image: "https://www.thetrainline.com/cms/media/11558/italy-rome-colosseum.jpg?mode=crop&width=1080&height=1080&quality=70" },
//   { name: "Taj Mahal", description: "A mausoleum in Agra, India.", image: "https://th-thumbnailer.cdn-si-edu.com/eBP1w0wGm1n7tZ4XtovPdnvxDOg=/800x800/filters:focal(1471x1061:1472x1062)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/b6/30/b630b48b-7344-4661-9264-186b70531bdc/istock-478831658.jpg" },
//   { name: "Petra", description: "An ancient city in Jordan.", image: "https://cdn.britannica.com/88/189788-050-9B5DB3A4/Al-Dayr-Petra-Jordan.jpg" }
// ];
// Generates a dictionary with {name: value(string), rating: value(number), description: value(string)}
// that represents the top places based on your city location
function generateBasedOnLocation() {
    return __awaiter(this, void 0, void 0, function () {
        var location, city, recommendations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, location_getter_1.getLocation)()];
                case 1:
                    location = _a.sent();
                    return [4 /*yield*/, (0, location_getter_1.getCityFromCoordinates)(location.lat, location.lng)];
                case 2:
                    city = _a.sent();
                    return [4 /*yield*/, (0, google_reccomendations_1.getTop50PopularPlaces)(location.lat, location.lng, city)];
                case 3:
                    recommendations = _a.sent();
                    return [2 /*return*/, recommendations];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var recommendations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, generateBasedOnLocation()];
                case 1:
                    recommendations = _a.sent();
                    // console.log("Top recommendations based on your location:");
                    console.log(recommendations);
                    return [2 /*return*/];
            }
        });
    });
}
main();
