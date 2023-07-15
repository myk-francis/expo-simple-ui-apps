import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";
import { NavigationContainer } from "@react-navigation/native";
import ActorScreen from "../../screens/ActorScreen";
import Loading from "../../components/Loading";
import axios from "axios";
import { fetchPersonDetails } from "../../api/movieDB";
import { cleanup } from "@testing-library/react-native";
import MockAdapter from "axios-mock-adapter";

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
jest.mock("@expo/vector-icons/FontAwesome", () => "FontAwesome");
jest.mock("@expo/vector-icons/AntDesign", () => "AntDesign");
jest.mock("@expo/vector-icons/Feather", () => "Feather");
jest.mock("expo-linear-gradient", () => "LinearGradient");

const mock = new MockAdapter(axios, { onNoMatch: "throwException" });

beforeEach(() => {
  jest.resetAllMocks();
});

beforeAll(() => {
  mock.reset();
});

afterEach(cleanup);

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({ goBack: jest.fn() }),
  useRoute: () => ({
    params: {
      person: {
        adult: false,
        gender: 1,
        id: 20,
        known_for_department: ["acting"],
        name: "mike",
        original_name: "Michael",
        popularity: 100,
        profile_path: "somewhere",
        cast_id: 1,
        character: "string",
        credit_id: "1",
        order: 1,
      },
    },
  }),
}));

const axiosMocked = {
  get: jest.fn(),
};

const response = [
  {
    adult: false,
    also_known_as: ["Элизабет Перкинс", "Elizabeth Ann Perkins"],
    biography:
      "Elizabeth Ann Perkins (born November 18, 1960) is an American actress. Her film roles have included About Last Night (1986), Big (1988), Avalon (1990), and He Said, She Said (1991), The Flintstones (1994), Miracle on 34th Street (1994), and her brief voice role as Coral in the Disney/Pixar animated film Finding Nemo (2003). She is also well known for her role as Celia Hodes in the Showtime TV series Weeds, for which she received three Primetime Emmy nominations and two Golden Globe nominations.",
    birthday: "1960-11-18",
    deathday: null,
    gender: 1,
    homepage: null,
    id: 20,
    imdb_id: "nm0001610",
    known_for_department: "Acting",
    name: "Elizabeth Perkins",
    place_of_birth: "Queens, New York City, New York, USA",
    popularity: 23.734,
    profile_path: "/vTWYllD9V76rgv9XAbtkkjjeunG.jpg",
  },
];

const component = (
  <NavigationContainer>
    {/* <Loading /> */}
    <ActorScreen />
  </NavigationContainer>
);

describe("ActorScreen", function () {
  //   it("success", async () => {
  //     const spyOn = jest.spyOn(console, "log");
  //     (axios as jest.Mocked<typeof axios>).get.mockResolvedValueOnce(
  //       "success data"
  //     );
  //     await fetchPersonDetails(1);
  //     expect(spyOn).toBeCalledWith("success data");
  //     spyOn.mockRestore();
  //   });
  //   it("error", async () => {
  //     const spyOn = jest.spyOn(console, "log");
  //     (axios as jest.Mocked<typeof axios>).get.mockRejectedValueOnce(
  //       new Error("some error")
  //     );
  //     await fetchPersonDetails(1);
  //     expect(spyOn).toBeCalledWith(new Error("some error"));
  //     spyOn.mockRestore();
  //   });
  it("should initially display loading component", async () => {
    mock
      .onGet("https://api.themoviedb.org/3/person/20?language=en-US")
      .reply(200, response);

    render(component);

    expect(screen.getByTestId("loading-component")).toBeOnTheScreen();
    await waitFor(() => {
      expect(screen.getByTestId("loading-component")).not.toBeOnTheScreen();
    });
  });
  //   it("should display back button with icon", async () => {
  //     render(component);
  //     // const backBtn = await screen.getByTestId("back-btn");
  //     // expect(backBtn).toBeOnTheScreen();
  //     await waitFor(() => {
  //       expect(screen.getByTestId("back-btn")).toBeOnTheScreen();
  //     });
  //   });
  //   it("should display fav button and it should be off", async () => {
  //     render(component);
  //     const favBtn = await screen.getByTestId("fav-btn");
  //     expect(favBtn).toBeOnTheScreen();
  //     expect(favBtn).toHaveStyle({ color: "white" });
  //   });
  //   it("should display actors image", async () => {
  //     render(component);
  //     const actorImage = await screen.getByTestId("actor-image");
  //     expect(actorImage).toBeOnTheScreen();
  //   });
  //   it("should display actors name", async () => {
  //     render(component);
  //     const actorName = await screen.getByTestId("actor-name");
  //     expect(actorName).toBeOnTheScreen();
  //   });
  //   it("should display actors location", async () => {
  //     render(component);
  //     const actorLocation = await screen.getByTestId("actor-location");
  //     expect(actorLocation).toBeOnTheScreen();
  //   });
  //   it("should display actors details", async () => {
  //     render(component);
  //     const actorDetails = await screen.getByTestId("actor-details");
  //     expect(actorDetails).toBeOnTheScreen();
  //   });
  //   it("should display actors biography", async () => {
  //     render(component);
  //     const actorBio = await screen.getByTestId("actor-biography");
  //     expect(actorBio).toBeOnTheScreen();
  //   });
  // expect(screen.toJSON()).toMatchSnapshot();
});
