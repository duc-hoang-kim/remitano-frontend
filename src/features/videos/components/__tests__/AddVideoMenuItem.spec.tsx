import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddVideoMenuItem from "../AddVideoMenuItem";

describe("AddVideoMenuItem", () => {
  it("Render add button and can open modal", () => {
    const onClick = jest.fn();

    const { getByTestId, getByText } = render(<AddVideoMenuItem onClick={onClick}/>);

    const addButton = getByText("Share a Movie");

    expect(addButton).toBeInTheDocument();

    userEvent.click(addButton);

    const AddVideoModal = getByTestId("add-video-modal");

    expect(onClick).toHaveBeenCalled()
    expect(AddVideoModal).toBeInTheDocument();
  });
});
