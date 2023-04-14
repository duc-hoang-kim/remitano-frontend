import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddVideoModal from "../AddVideoModal";

let mockFetchCreateVideo = jest.fn()
jest.mock("../../hooks/useCreateVideo", () => ({
  __esModule: true,
  default: () => ({ fetchCreateVideo: mockFetchCreateVideo }),
}));

describe("AddVideoModal", () => {
  it("render text input and share button", async () => {
    const { getByLabelText, getByText } = render(<AddVideoModal open={true} onClose={jest.fn()} />);
    const addButton = getByText("Share");
    const urlInput = getByLabelText("Youtube URL");

    expect(addButton).toBeInTheDocument();
    expect(urlInput).toBeInTheDocument();

    const url = 'https://www.youtube.com/watch?v=WfGn1yTL8TI';
    userEvent.type(urlInput, url);
    userEvent.click(addButton);

    await waitFor(() => {
      screen.debug()
      expect(mockFetchCreateVideo).toHaveBeenCalledWith({ youtube_url: url })
    });
  });
});
