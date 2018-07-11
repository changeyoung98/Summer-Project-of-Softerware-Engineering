import csv


def main():
    csvFile = open('E://triplet-reid/data/test.csv', 'w', newline='')
    print("open success")
    writer_csv = csv.writer(csvFile)
    writer_csv.writerow([1, "test/test0.jpg"])
    csvFile.close()


if __name__ == '__main__':
    main()