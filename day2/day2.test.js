const testFileName = "./day2/test.txt";
const dataFileName = "./day2/data.txt";
const day = "2";
const { run, scoreRound, scoreRoundVersion2, outcome, getMyPlay } = require("./day2.js");

test("Score round", () => {
  let round = ["A", "X"];
  // Draw
  expect(outcome(round)).toBe('draw');
  // Played rock - 1, draw - 3
  expect(scoreRound(round)).toBe(4);
  // Played paper - 2, won - 6
  expect(scoreRound(["A", "Y"])).toBe(8)
});

test("Score round version 2", () => {
    let round = ["A", "X"];

    let myPlay = getMyPlay(round)
    expect(myPlay.myPlay).toBe('s')
    expect(myPlay.outcome).toBe('loss')

    // Played rock ties rock - 1, draw - 3
    expect(scoreRoundVersion2(["A", "Y"])).toBe(4);
    // Played scissors beats paper - 3, won - 6
    expect(scoreRoundVersion2(["B", "Z"])).toBe(9)
  });

test("Day " + day + " should work with test data", () => {
  const answer = run(testFileName, scoreRound);
  expect(answer.score).toBe(15);
});

test("Day " + day + " with alternate key should work with test data", () => {
    const answer = run(testFileName, scoreRoundVersion2);
    expect(answer.score).toBe(12);
  });


  test("Day " + day + " should work with test data again", () => {
    const answer = run(dataFileName, scoreRound);
    console.log('Answer', answer)
    // One gold start
      expect(answer.score).toBe(15572)
  
  });

  test("Day " + day + " should work with test data again", () => {
    const answer = run(dataFileName, scoreRoundVersion2);
    console.log('Answer', answer)
    // One gold start
      expect(answer.score).toBe(16098)
  
  });