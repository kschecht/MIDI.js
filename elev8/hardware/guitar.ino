#define arr_len( x )  ( sizeof( x ) / sizeof( *x ) )
// guitar strumming string 0-5 from thinnest to thickest (flip array for a left-handed guitar)
const int strumPins[6] = {14, 12, 11, 10, 9, 8};
// guitar neck string 0-5 from thinnest to thickest (flip array for a left-handed guitar)
const int stringPins[6] = {2,3,4,5,6,7};
// guitar fret 0-2 for the first three frets from top to bottom
const int fretPins[3] = {17, 18, 19};
volatile byte strummingState[6] = {LOW,LOW,LOW,LOW,LOW,LOW};
void setup() {
  // initialize the strumming strings as interrupt input
  for (int i = 0; i < arr_len(strumPins); i++) {
    pinMode(strumPins[i], INPUT_PULLUP);
  }
  attachInterrupt(digitalPinToInterrupt(strumPins[0]), recordStrum1, FALLING);
  attachInterrupt(digitalPinToInterrupt(strumPins[1]), recordStrum2, FALLING);
  attachInterrupt(digitalPinToInterrupt(strumPins[2]), recordStrum3, FALLING);
  attachInterrupt(digitalPinToInterrupt(strumPins[3]), recordStrum4, FALLING);
  attachInterrupt(digitalPinToInterrupt(strumPins[4]), recordStrum5, FALLING);
  attachInterrupt(digitalPinToInterrupt(strumPins[5]), recordStrum6, FALLING);
  // initialize the string pins as input:
  for (int i = 0; i < arr_len(stringPins); i++) {
    pinMode(stringPins[i], INPUT);
  }
  
  // initialize the fret pins as output:
  for (int i = 0; i < arr_len(fretPins); i++) {
    pinMode(fretPins[i], OUTPUT);
  }
  
  // initialize serial communication:
  Serial.begin(9600);
}
void loop() {
  // Variables to record which fret the string is being pressed on.
  // valid values: 0 (none pressed), 1, 2, 3 (fret)
  int stringStates[6] = {0,0,0,0,0,0};
  int curStrummingState[6] = {0,0,0,0,0,0};
  for (int i = 0; i < arr_len(strummingState); i++) 
  {
    if (strummingState[i]) 
    {
      curStrummingState[i] = 1;
      strummingState[i] = LOW;
    }
  }
  
  // Scan for each fret to check if any string is pressed against it
  for (int i = 0; i < arr_len(fretPins); i++) 
  {
      digitalWrite(fretPins[i], HIGH);
      delay(10); // Delay a little bit to avoid bouncing
      for (int j = 0; j < arr_len(stringPins); j++)
      {
          if (digitalRead(stringPins[j]) == HIGH)
          {
            stringStates[j] = i + 1;  // fret is 1-based, reserve state 0 for none pressed
          }
      }
      digitalWrite(fretPins[i], LOW);
  }
  JSONFormatter(stringStates, curStrummingState);
//  // print out state for debugging
//  Serial.print("fret: \t");
//  for (int i = 0; i < arr_len(stringStates); i++) {
//    Serial.print(stringStates[i]);
//    Serial.print('\t');
//  }
//  Serial.print("strumming: \t");
//  for (int i = 0; i < arr_len(curStrummingState); i++) {
//    Serial.print(curStrummingState[i]);
//    Serial.print('\t');
//  }
//  Serial.println("");
  delay(10);
}
void recordStrum1() {
  strummingState[0] = HIGH;
}
void recordStrum2() {
  strummingState[1] = HIGH;
}
void recordStrum3() {
  strummingState[2] = HIGH;
}
void recordStrum4() {
  strummingState[3] = HIGH;
}
void recordStrum5() {
  strummingState[4] = HIGH;
}
void recordStrum6() {
  strummingState[5] = HIGH;
}
void JSONFormatter(int frets[], int strummed[]) {
   // form a JSON-formatted string:
   int i;
    String jsonString = "{ \"frets\":\ [";
    for (i = 0; i < 6; i++) {
  
      jsonString += frets[i];
      
      if (i < 5) {
        jsonString += ",";
      } 
    }   
    jsonString += "], ";
    jsonString += "\"strummed\":\ [";
    for (i = 0; i < 6; i++) {  
      jsonString += strummed[i];
            
      if (i < 5) {
        jsonString += ",";
      } 
    }
    jsonString += "] }";
    // print it:
    Serial.println(jsonString);
}