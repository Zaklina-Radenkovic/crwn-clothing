import { useRef } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";

import Card from "../ui/Card";

function NewMeetupForm(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };

    props.onAddMeetup(meetupData);
  }

  const style = {
    "& label.Mui-focused": {
      color: "inherit",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "inherit",
      },
    },
  };
  return (
    // <Card>
    //   <form className={classes.form} onSubmit={submitHandler}>
    //     <div className={classes.control}>
    //       <label htmlFor="title">Meetup Title</label>
    //       <input type="text" required id="title" ref={titleInputRef} />
    //     </div>
    //     <div className={classes.control}>
    //       <label htmlFor="image">Meetup Image</label>
    //       <input type="url" required id="image" ref={imageInputRef} />
    //     </div>
    //     <div className={classes.control}>
    //       <label htmlFor="address">Address</label>
    //       <input type="text" required id="address" ref={addressInputRef} />
    //     </div>
    //     <div className={classes.control}>
    //       <label htmlFor="description">Description</label>
    //       <textarea
    //         id="description"
    //         required
    //         rows="5"
    //         ref={descriptionInputRef}
    //       ></textarea>
    //     </div>
    //     <div className={classes.actions}>
    //       <button>Add Meetup</button>
    //     </div>
    //   </form>
    // </Card>

    <Card>
      <form onSubmit={submitHandler}>
        <Stack spacing={3} sx={{ padding: "1rem" }}>
          <Stack spacing={2}>
            <TextField
              label="Meetup Title"
              required
              ref={titleInputRef}
              sx={style}
            />
            <TextField
              label="Meetup Image"
              type="url"
              required
              ref={imageInputRef}
              sx={style}
            />
            <TextField
              label="Address"
              type="text"
              required
              ref={addressInputRef}
              sx={style}
            />
            <TextField
              id="outlined-textarea"
              label="Description"
              required
              multiline
              rows={5}
              ref={descriptionInputRef}
              sx={style}
            />
          </Stack>
          <Stack justifyContent="center">
            <Button
              sx={{
                alignSelf: "end",
                color: "#fff",
                backgroundColor: "#a50e48",
                borderColor: "#a50e48",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#a50e48",
                  borderColor: "#a50e48",
                },
              }}
            >
              Add Meetup
            </Button>
          </Stack>
        </Stack>
      </form>
    </Card>
  );
}

export default NewMeetupForm;
