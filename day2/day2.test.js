const testFileName = "./day2/test.txt";
const dataFileName = "./day2/data.txt";
const day = "2";
const { run, scoreRound, scoreRoundVersion2, outcome, getMyPlay } = require("./day2.js");

let round = ["A", "X"];

test("outcome", () => {
    // Draw
    expect(outcome(round)).toBe('draw');
})

test("scoreRound", () => {
  // Played rock - 1, draw - 3
  expect(scoreRound(round)).toBe(4);
  // Played paper - 2, won - 6
  expect(scoreRound(["A", "Y"])).toBe(8)
});

test("getMyPlay", () => {

    let myPlay = getMyPlay(round) 
    expect(myPlay.myPlay).toBe('s')
    expect(myPlay.outcome).toBe('loss')
})
test("scoreRoundVersion2", () => {
    // Played rock ties rock - 1, draw - 3
    expect(scoreRoundVersion2(["A", "Y"])).toBe(4);
    // Played scissors beats paper - 3, won - 6
    expect(scoreRoundVersion2(["B", "Z"])).toBe(9)
  });

test("test answer 1", () => {
  const answer = run(testFileName, scoreRound);
  expect(answer.score).toBe(15);
});

test("test answer 2", () => {
    const answer = run(testFileName, scoreRoundVersion2);
    expect(answer.score).toBe(12);
  });


  test("Answer", () => {
    const answer = run(dataFileName, scoreRoundVersion2);
    console.log('Answer 2::', answer)
  });