<template>
  <div style="align-items: center; text-align: center">
    <story
      name="Louis Hildebrand"
      git-hub="louis-hildebrand"
      ID="1763"
      challenge="- I originally intended to continue the iterative method until no progress could be made, but there was a bug in my program that made it exit the loop after only one pass. Upon finding and fixing the bug, I saw that it had actually made my algorithm noticeably faster!

- The suggestion to use bitfields came from Kavosh's excellent post on Piazza and from a few friends.

- A lot of the iterative techniques I used were from https://menneske.no/sudoku/5/eng/.

- I added the assign() method after solving a few sudokus by hand."
      text="- Wherever a Collection would have been used, a custom Bitfield class is used instead. This stores the data in a single 32-bit integer (e.g. the Bitfield with the binary number 0...01101 contains 0, 2, and 3), allowing for quick access/modification using bitwise operations.

- The possible values for every blank cell are found at the beginning of the algorithm. Whenever a change is made to the grid, the cells in the same row, column, and block are also updated right away. If only one possible value remains in one of those other affected cells, that number is assigned to that cell and the same process is triggered again.

- Before every guess, simple sudoku solving techniques are applied (e.g. identifying lone singles, hidden singles, locked candidates, x-wings, etc.). Repeating this until no further progress can be made would be the most thorough, but I found that performing a single pass was fastest.

- For each guess, the cell that currently has the fewest possible values is chosen."
      pseudocode="// A few of the fast Bitfield methods
class Bitfield {
        int data

        add(int num):
                int mask = 1 << num
                this.data = this.data | mask

        // Checks if another Bitfield is a subset of this one
        contains(Bitfield subset):
                int intersection = subset.data | this.data
                return intersection == this.data
}

// The method used to update possible values
assign(value, row, column):
        set the value in the grid and clear the possible values for this cell
        for each cell in the same row:
                remove value from its possible values
        for each cell in the same column:
                remove value from its possible values
        for each cell in the same block:
                remove value from its possible values
        for each cell (newRow, newColumn) that was updated:
                if only one possible value remains:
                        assign(newValue, newRow, newColumn)"
    ></story>
    <story
      name="Hyunwoo Yoon"
      ID="1936"
      challenge="The challenge I had was to build an efficient way of doing the above process. I almost only used for loops, while loops and arrays. (Not arraylists but only arrays). And therefore I don't think my code itself is the most efficient application of my intuition, but what I did was creating some array[i][j][something] and consider i as row, j as column, and something as space to indicate the wished values (possible entries, whether the number in the space is definitive or assumption, whether the space was visited or not, etc).

However the biggest challenge I had was finding out why my code wasn't working, or was reaching some codes I putted to see if it was having some exceptions that normally shouldn't happen if my intuition was correct. In most cases I improvised as adding if then return or if then break or etc, but I think I could've prevented them in advance, which is sad because I wasn't able to find the way how."
      text="I approached in a way how I usually solve sudoku, i.e. write down all possible entries of each block, and first input for each block with only one possible entry, for each block with certain entry that is only possible in that block for given line/3x3/king/queen/knight etc, then if for given SIZExSIZE squares, if a certain possible entry forms a line, modify the possible entry block within the same line. and Try and error starting with blocks with smallest entries."
      pseudocode="0.given the puzzle
1.optimize it, i.e. fill in the blanks that has only one possible option, until you have no such blanks.
2.pick a blank with least possible entries(I chose to do so because that was more convenient in my case, but it loops quite a lot for the module to work so I regret by now), and choose one entrie.
3. optimize it again, and see if it creates a blank with no possible entry. if so, choose the other digit. if not, continue.
4. until there exist no more blank, repeat the step 2~3."
    />
    <story
      name="Charles Lapierre"
      ID="1743"
      pseudocode="
***Note that this method was split into many more methods
***I will only include the base game because the chess rules can be implemented easily

emptyCells = new ArrayList<Integer>[][]
solve() {
  for all rows
    for all columns
      if grid[row][col] == 0
        fill emptyCells[row][col] with all possible numbers

  while changed
    changed = false
    for all rows
      for all columns
        if emptyCells[row][col].size() == 0
          continue
        else if emptyCells[row][col].size() == 1
          grid[row][col] = emptyCells[row][col].get(0)
          emptyCells[row][col] = null
          remove grid[row][col] from all Emptycells in row, col, box
          changed = true
        else
          for all Integer i in emptyCells[row][col]
            if (i is onlyInCol || i is onlyInRow || i is onlyOnBox)
              grid[row][col] = i
              emptyCells[row][col] = null
              remove i from all EmptyCells in row, col, box
              changed = true

  backtrackSolve()
}

backtrackSolve() {
  stores the current state of the grid and of EmptyCells in a linked list as a stack of solutions.
  look for the emptyCell with the smallest number of possible options
  loop through all options for that one //atleast one of them HAS to be correct
  perform all actions from solve and return true if it is solved
}
"
      text="I decided to implement some preliminary logic before executing the backtracking because it would reduce the number of variables to change: it lowers the height of the tree of possibilities. I went with the idea that sometimes backtracking would not even be necessary because some sudoku can be solved using only basic logic. My logic is to fill any cell that has only 1 possibility OR any cell that has a possibility that does not appear anywhere in the row OR column OR box."
      challenge="I started with the backtracking step and then added the logic."
      git-hub="chuckypoo123"
    />
    <story
      name="Sofia Fiore"
      ID="1767"
      pseudocode="
           // This method finds the cell with the fewest number of possible number choices
private int[] findBestCell () {
       boolean foundEmpty = false
       int fewestChoices = N+1
       int [] bestCell = new int[3]
for each cell in the grid {
       if cell is empty then {
          foundEmpty = true
       int numberOfChoices = 0
       for each number from 1 to N {
       if placing that number at that position does not cause any conflicts then {
       numberOfChoices = numberOfChoices + 1
       }
       }
       if numberOfChoices < fewestChoices then {
          fewestChoices = numberOfChoices
          bestCell = new int[] {row, col, amountOfChoices}
       }
       }
}
this.solved = !foundEmpty // if an empty cell cannot be found, then the sudoku is solved
return bestCell
}

// This method finds all the possible number choices for each cell in the grid
// The method takes as input the choices array from the previous iteration
private int[][] findChoices (int [][] choices) {
       boolean foundEmpty = false
for each cell in the grid {
       if cell is empty then {
          foundEmpty = true
       int numberOfChoices = 0
       for each number from 1 to N {
       if placing that number at that position causes a conflict then {
       choices[row*N + col][number-1] = 0
       }
       }
       }
}
this.solved = !foundEmpty //if an empty cell cannot be found, then the sudoku is solved
if the sudoku is not solved then {
	//This method will find all the naked pairs and hidden singles in the grid and modify the choices array if any are found
       choices = findNakedPairsAndHiddenSingles(choices)
}
return choices
}
"
      challenge="At first I started with a simple brute-force approach that chose empty cells from left to right and up to down. However, this was pretty slow and I wanted to make it much faster. After finding a way to choose the next cell based on the number of possible number choices, the algorithm was a bit faster but still very slow. It took me a long time to figure out a better way to optimize my algorithm. This is when I looked up some sudoku solving techniques and I decided to implement them into my algorithm. Once I did this, my algorithm was much faster than it was before."
      text="The whole solving algorithm is a backtracking algorithm with a few additions. The first thing I did to optimize my algorithm was to figure out a way to choose the cell with the fewest number of possible number choices. This way, I would have to backtrack less if I placed a number in that cell. Next I used a 2d int array to store all the possible number choices for each cell. Then I applied some pen and paper sudoku solving techniques to my algorithm. I decided to used the Naked Pairs and Hidden Singles techniques because they seemed like they would be the simplest to implement. To summarize the Naked Pairs technique, the goal is to find two cells in the same row/column/box with the same two possible number choices. These numbers can only be in those two cells. Therefore, you can remove those two numbers from the number choices of every other cell in that row/column/box. This technique can be applied with any number of cells, but it's easiest to do with only two cells. To summarize the Hidden Singles technique, the goal is to find a cell that has a possible number choice that no other cell in that row/column/box has. That cell is the only cell that you can place that number, so you can remove all the other number choices from that cell. With these strategies, I was able to make a pretty fast algorithm."
    />
    <story
      name="Emma Tomiuk"
      ID="2208"
      challenge="The major challenge I had was finding a way to keep track of the previous board states and hashtables during the recursive calls so that I could reset the board when a chosen number led to an incorrect solution. To solve this, I used a stack for the grids and for the hashtables from which I pushed hashtables/grids whenever it changed and popped whenever the sudoku was unsolvable and peeked at the next element to reset my grid/hashtable. "
      text="The approach I took was fairly simple since it was basically what I would do when solving a sudoku by hand. The aspect of my code that greatly optimized the performance was the use of a hashtable that mapped keys – integers that represented a specific cell on the sudoku grid – to a list of possible numbers that could go in that grid, similar to how we write down possible numbers in a sudoku solved by hand. Using this hasthable decreased the number of times we needed to backtrack. That way, adding and removing keys when a cell was filled could be done in constant time, as well as retrieving the possible numbers in the cell. The hashtable was what also allowed me to verify certain important conditions in constant time, like when the grid filled (there are no keys in the hashtable) or when the grid is unsolvable in its current state (one key maps to an empty array – no possibilities for that cell)."
      pseudocode="Sudoku Solver Pseudocode ---------------------------------------------------------------------------------------------------------------------------------

solve(sudoku, allSolutions){
	initialize a new Hashtable
	while the grid is not empty{
		if (!fill(board)){
			break //at this point there are no more trivial cells to fill in
	if (grid is not empty){
		s = new stack of Hashtables
		s.push(current hashtable)
		board = new stack of grids
		board.push(current grid)
		toCheck = cell with the smallest amount of num options //if there are no options, the grid will not be filled (indicates an error)
		for each number in toCheck {
			add that number to the cell
			remove that number from the possibilities in the corresponding spots (row, box, col, etc)
			if solveRecursive(sudoku, s, board, allSolutions) == true { //solveRecursive does essentially the exact same thing as solve() except 										    	      for making a new hashtable
				if (allSolutions){
					solution = new Sudoku object with same fields as current Sudoku
					add solution to hashset of solutions
					hashset = s.peek() //reset the hashset to check other possible nums
					grid = board.peek()
				}else{
					break
			}else{
				s.pop() //reset the board to what it was before adding the new number
				hashset = s.peek()
				board.pop()
				grid = board.peek()
			}
		}
	}
	if (allSolutions){
		if no solution was added yet to solutions hashset {
			solution = new Sudoku object with same fields as current Sudoku
			add solution to hashset of solutions //because we never recursed
		}
		update the current grid to one of the solutions
	}
}

Sudoku fill pseudocode ----------------------------------------------------------------------------------------------------------------------------------

fill(sudoku grid){
	hasUpdated = false //keeps track of if we have updated the grid
	p = new Hashtable()
	for each key in current hashtable{
		if key maps to an array of size 1 (one number option){
			num = that one number
			add that number in the cell
			remove that number from the possibilities from the corresponding cells (row, box, col...)
			hasUpdated = true
		}else{
			p.put(key, value of key)
		}
	}
	hashtable = p //the new hashtable without the cells with one option

	for (i from 0 to 8){ //checks if a number appears once in a row or column
		for (num from 1 to 9){
			if there is only one place num can be in row i {
				add num to that place in row i
				remove that number from the possibilities from the corresponding cells
				hasUpdated = true
				remove that cell from the hashtable
			}
			if there is only one place num can be in col i {
				add num to that place in col i
				remove that number from the possibilities from the corresponding cells
				hasUpdated = true
				remove that cell from the hashtable
			}
		}
	}
	for (row from 0 to SIZE){ //checks if a number appears once in a box
		for (col from 0 to SIZE){
			for (num from 1 to 9){
				if there is only one place num can be in box (row, col){
					add num to that place in box (row, col)
					remove that number from the possibilities from the corresponding cells
					hasUpdated = true
					remove that cell from the hashtable
			}
		}
	}
	return hasUpdated
}
"
    >
    </story>
    <story
      name="Wassim Jabbour"
      challenge="The main challenge was coming up with the idea of using a 2D array of bitmasks instead of a 3D array of booleans to store the possibilities of each cell. Also, to come up with the 2 phases (insertion, filtering) of the iterative part, I had to do some research about the topic of solving sudokus (stackoverflow, reading papers...). "
      text="I mainly used bitfields to store the possibilities of every spot in a separate 2D array (the possibilities matrix), and modified that array every time I added a new number to the sudoku grid. As pure brute force backtracking is way too slow to solve a 5x5 grid, I implemented some iterative rules to reduce runtime,  which can be divided into two phases: insertion and filtering. For the insertion phase, the algorithm fills the cells with unique possibilities (1 rule), and iterates over the grid to add the numbers that can only go in one spot by the rules of the game (2 rules, one for numbers that only fit in one spot of a given row/column, and the other for numbers that only fit in one spot of a given sub-grid). For the filtering phase, the algorithm restricts the numbers that can go in certain cells by applying the corresponding bitmasks on the possibilities matrix (2 rules, one that checks if a given number only fits in one spot of a given row/column in a sub-grid and removes it from the possibilities matrix of the rest of the that row/column, and the other that finds pairs of cells in a given sub-grid that can only take on the exact same pair of values and removes those values from the possibilities matrix of the rest of the rows/columns on which the 2 cells happen to be). These 5 iterative rules keep on repeating until the number of changes made for every iteration falls below a certain threshold. At that point, we enter the brute force part of the method (as below a certain threshold the iterative part of the method becomes slower than the brute force one): we first make a deep copy of both the sudoku grid and the possibilities matrix (The reason for this will become apparent later). We then find the empty cell in the grid that can take on the fewest numbers according to the possibilities matrix (To minimize the number of dead ends we reach), and insert the next number it can take in the copy of the grid while modifying the copy of the possibilities matrix accordingly. Finally, we call the solve method recursively and pass it the copies of the grid and the possibilities matrix. This way, if we reach a dead end a while later, we can just discard the copied grid / possibilities matrix passed to the child method and go back to those of the parent (Removes the need to undo the changes we performed on those two arrays when we added the wrong number in the parent call). One final feature that helped accelerate the solving is the base case of the recursion: While searching for the next empty cell with the highest priority (eg the one with the least possibilities) , if we encounter an empty cell with no possibilities according to the possibilities matrix, we directly backtrack without wasting time trying to add a few more numbers before realizing that we are at a dead end. This way we prune a significant portion of the recursion tree, boosting the runtime of the algorithm. Also, if no empty cells are found then, we have our solution and can let the parent know by adding a boolean return type or something similar.
  "
      pseudocode="
For storing the bitfields in the possibilities matrix, I used a system where a sequence of 1s and 0s specifies which values can go in a given spot. For example, the bitfield 001111001 specifies that a 1 can go in the spot, a 2 can't, a 3 can't, a 4 can... (from right to left):

void initializeMatrix(){
     for(every entry in the possibilities matrix)
          store a series of N 1s, where N is the size^2 of the sudoku (9 for a 3x3)
          //As at the beginning we assume every cell can store every number

     for(every entry in the sudoku grid)
          if(entry is not 0)
                apply the bitmask to the affected squares in the possibilities matrix (row, col, ...)
                //Applying the bitmask means setting the corresponding digit of the bitfield to 0
 }


To demonstrate the efficiency of using bitfields, here is the pseudocode for the method that checks if a cell has a unique possibility and returns the number to add if true:

int checkIfUnique(int row, int column){
     if(possibilities matrix at row, column has a single 1 bit)
            return the position of that 1 starting from the right
            //As the rightmost digit represents the number 1, the 2nd rightmost the number 2...

     return -1; //To say that it does not have a single possibility
}
(So instead of going through a whole array of booleans, we just manipulate a bitifield which is less costly)


To once again show the convenience of using bitfields, this final method takes in a number as well as a row and a column that represent the coordinates at which we added the number in the sudoku grid. It modifies the possibilities matrix accordingly:

void applyMask(int row, int column, int number){
     bitMask = !(1 << (number-1))
     //This way we get a bitfield with all 1s except a 0 at the spot corresponding to number
     //For example, if number = 5, then we shift the 1 by 4 spots to the left to get 00001000
     //We then apply the ! operator which inverts every bit to get 11110111

     for(every spot in the same row, column, submatrix, as well as chess rule affected spots){
           possibilities matrix at that spot &= bitfield
          //Logical and to set the spot corresponding to number to 0
          //This says that the number can't go there anymore
     }
}
"
      git-hub="WassimJabz"
      ID="1697"
    >
    </story>
  </div>
</template>

<script>
import Story from "../components/Story";

export default {
  name: "StoriesView",
  components: { Story },
};
</script>

<style scoped>
.story {
  display: block;
}
</style>
