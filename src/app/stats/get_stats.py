import sys
import numpy as np
import seaborn as sns
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.colors as cl
import argparse
import json


def get_stat_container(data):

    width = 0.15   
    contenedores = ['Papel y Carton', 'Aceite', 'Vidrio', 'Ropa', 'Envases ligeros',  'Orgánico']
    x = np.arange(len(contenedores))
    x = x * width

    colors = sns.color_palette("deep",len(contenedores))
    colors[4] = "#ccb974"
    fig, ax = plt.subplots(figsize=(30, 15))

    print(">>Generando diagrama de barras contenedores")
    ax.bar(x ,data, width * 0.5, color=colors)

    plt.xticks(ticks= x, labels= contenedores, fontsize=32)
    ax.set_ylabel('Contenedores llenos',fontsize=32, color = '#3a5e62')
    ax.tick_params(axis='both', labelsize=32, colors = '#3a5e62')

    max_value = np.max(data)
    plt.yticks([0,max_value,1])
    
    plt.title("Contenedores llenos", fontsize = 48, pad = 50, color = '#3a5e62')
    

    plt.savefig('./stats_containers.png', format='png', transparent = True)

    print(">>Diagrama generado de contenedores")

    plt.cla()

def get_stat_street(data, street):

    width = 0.15   
    x = np.arange(len(street))
    x = x * width

    colors = sns.color_palette("deep",len(street))
    fig, ax = plt.subplots(figsize=(30, 15))

    print(">>Generando diagrama de barras de calles")
    print(x)
    ax.bar(x ,data, width * 0.5, color=colors)

    plt.xticks(ticks= x, labels= street, fontsize=32)
    ax.set_ylabel('Contenedores llenos',fontsize=32, color = '#3a5e62')
    ax.tick_params(axis='both', labelsize=32, colors = '#3a5e62')


    plt.yticks([0,1,1])
    
    plt.title("Cantidad de incidencias", fontsize = 48, pad = 50, color = '#3a5e62')
    

    plt.savefig('./stats_inquiries.png', format='png', transparent = True)

    print(">>Diagrama generado de calles")

    plt.cla()
    
if __name__ == "__main__":
    print(">> Inicio script")
    parser = argparse.ArgumentParser()   
    parser.add_argument('-c', '--container' , action = 'store_true')     
    parser.add_argument('-s', '--street'    , action='store_true')
    parser.add_argument("array", action = 'store')
    subparsers = parser.add_subparsers(help="Subparser para la opcion de calles")

    parser_a = subparsers.add_parser('st', help='a help')
    parser_a.add_argument('streets',type=str, help='bar help')
    

    args = parser.parse_args()
    array = json.loads(args.array)

    if(args.container):
        print(">> Contenedor")
        get_stat_container(array)

    if(args.street):
        print(">> Calles")
        print(args.streets.split(","))
        get_stat_street(array,args.streets.split(","))

    
