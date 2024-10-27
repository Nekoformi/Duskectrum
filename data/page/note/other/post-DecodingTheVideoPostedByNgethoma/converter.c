#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char *argv[]) {
    // argv[1]: File path
    // argv[2]: Separate with a specific character (or not)
    // argv[3]: Insert line breaks (\n) as in the original data (or not)
    // argv[4]: Output the alphabet corresponding to the index (or not)

    FILE *fp = fopen(argv[1], "r");

    if (fp == NULL) {
        printf("Failed to read file.\n");

        return -1;
    }

    char sep = argv[2] != NULL ? argv[2][0] : 0;
    int ins = strcmp(argv[3], "1") == 0 ? 1 : 0;
    int alp = strcmp(argv[4], "1") == 0 ? 1 : 0;

    char v;
    int c = 0;

    while((v = fgetc(fp)) != EOF) {
        if (v == '\n' || v == sep) {
            if (alp == 1) {
                putchar(c != 0 ? c + 64 : ' ');
            } else {
                printf("[%02d]", c);
            }

            if (v == '\n' && ins == 1) putchar('\n');

            c = 0;
        } else {
            c++;
        }
    }

    putchar('\n');

    fclose(fp);

    return 0;
}
