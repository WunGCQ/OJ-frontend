#coding: utf-8
import os
import csv


def  removeAll(path) :
	for root, dirs, files in os.walk( path ):
		for fn in files
			removeColCSV(fn)

def removeColCSV(csvfile) :
	if csvfile.find('_all') !=  -1 :
		newCSVName = csvfile.split('_')[2] 
		c = file(newCSVName,'wb')
		cToRead = file(csvfile,'rb')
		reader = csv.reader(cToRead)
		writer = csv.writer(c)
		writer.writerow('date','hour','type','dongsi')
		counter = 0
		writeData = []
		for line in reader :
			counter++
			if counter % 5 == 0 or counter%5 == 4 :
				writeData.append((line[0],line[1],line[2],line[3]))
		
		cToRead.close()
		writer.writerows(writeData)
		c.close()
