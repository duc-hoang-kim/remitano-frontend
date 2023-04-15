import React from "react";
import { render } from "@testing-library/react";
import AddVideoButton from "../AddVideoButton";
import userEvent from "@testing-library/user-event";

describe("AddVideoButton", () => {
  it("Render add button and can open modal", () => {
    const { getByTestId, getByText } = render(<AddVideoButton />);

    const addButton = getByText("Share a Movie");

    expect(addButton).toBeInTheDocument();

    userEvent.click(addButton);

    const AddVideoModal = getByTestId("add-video-modal");

    expect(AddVideoModal).toBeInTheDocument();
  });
});
