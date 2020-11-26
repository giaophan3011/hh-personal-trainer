export async function addNewTraining(newTraining) {
  return await fetch("https://customerrest.herokuapp.com/api/trainings", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTraining), // body data type must match "Content-Type" header
  }).then((response) => response.json());
}

export async function getTrainings(trainingLink) {
  console.log(trainingLink);
  return await fetch(trainingLink).then((response) => response.json());
}

export async function deleteTraining(training) {
  return await fetch(training.links.find((element) => element.rel === "self").href, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function deleteTrainingById(training) {
  return await fetch("https://customerrest.herokuapp.com/api/trainings/" + training.id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function getAllTrainings() {
  return await fetch("https://customerrest.herokuapp.com/gettrainings").then((response) =>
    response.json()
  );
}
