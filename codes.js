module.exports = {
  answer: [
    `#include <bits/stdc++.h>
using namespace std;

int main(){
    int number_of_elements;
    cin >> number_of_elements;
    vector <int> array(number_of_elements);
    int sum_of_array = 0;
    
    for(int i = 0; i < number_of_elements; i++){
       cin >> array[i];
       sum_of_array += array[i];
    }
    
    cout << sum_of_array;
    return 0;
}`,

`vector<int> compareTriplets(vector<int> a, vector<int> b) {
    int alice = 0;
    int bob = 0;
    vector <int> answer(2);
    for(int i = 0; i < 3; i++) {
        if (a[i] > b[i]) alice++;
        if (a[i] < b[i]) bob++;
    }
    answer[0] = alice;
    answer[1] = bob;
    return answer;
}`,

`long aVeryBigSum(vector<long> ar) {
    long s = 0;
    for (int i = 0; i < ar.size(); i++) s += ar[i];
    return s;
}`,

`#include <iostream>

using namespace std;

int main() {
    int n;
    cin >> n;

    int arr[n][n];

    long long int d1=0; //First Diagonal
    long long int d2=0; //Second Diagonal

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cin >> arr[i][j];
            if (i == j) d1 += arr[i][j];
            if (i == n - j - 1) d2 += arr[i][j];
        }
    }

    cout << abs(d1 - d2) << endl; //Absolute difference of the sums across the diagonals
    return 0;
}`,
`#include<iostream>

using namespace std;

int main() {
    int n;
    cin >> n;

    float pl = 0, mn = 0, zr = 0;

    for (int i = 0; i < n; i++) {
        int val;
        cin >> val;
        zr += (val == 0);
        pl += (val > 0);
        mn += (val < 0);
    }
    
    zr = zr / (double)n;
    pl = pl / (double)n;
    mn = mn / (double)n;
    
    printf("%0.06lf\n%0.06lf\n%0.06lf\n", pl, mn, zr);
    return 0;
}`,
`#include<iostream>

using namespace std;

int main () {
    int height;
    cin >> height;

    for (int i = 1; i <= height; i++) {
        for (int j = 0; j < i; j++) {
            if(j==0) {		
                //Printing spaces 
                for(int t = 0; t < height - i; t++) cout << " ";
            }
            //Print hashes
            cout << "#";
        }
        cout << endl;
    }
    return 0;
}`,

  ],
};
