import sys
import numpy as np
import seaborn as sns
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.colors as cl


def get_stat_container(data):

    width = 0.15   
    contenedores = ['Papel y Carton', 'Aceite', 'Vidrio', 'Ropa', 'Envases ligeros',  'Orgánico']
    x = np.arange(len(contenedores))
    x = x * width

    colors = sns.color_palette("deep",len(contenedores))
    colors[4] = "#ccb974"
    fig, ax = plt.subplots(figsize=(30, 15))

    print(">>Generando diagrama de barras")
    ax.bar(x ,data, width * 0.5, color=colors)

    plt.xticks(ticks= x, labels= contenedores, fontsize=32)
    ax.set_ylabel('Contenedores llenos',fontsize=32, color = '#3a5e62')
    ax.tick_params(axis='both', labelsize=32, colors = '#3a5e62')

    max_value = max(data)
    plt.yticks([0,max_value,1])
    
    plt.title("Contenedores llenos", fontsize = 48, pad = 50, color = '#3a5e62')
    

    plt.savefig('./stats_containers.png', format='png', transparent = True)

    print(">>Diagrama generado")

    plt.cla()

def get_stat_street(data):

    
    pass
    
if __name__ == "__main__":

    array = sys.argv[1].split(",")
    array = list(map(lambda data : int(data) ,array))
    get_stat_container(array)
