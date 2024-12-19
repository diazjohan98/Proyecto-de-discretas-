import random

# Variables globales para almacenar la gramática
no_terminales = set()  # Conjunto de símbolos no terminales
terminales = set()  # Conjunto de símbolos terminales
producciones = {}  # Diccionario para las producciones de la gramática
simbolo_inicial = ""  # Símbolo inicial de la gramática

def ingresar_gramatica():
    """
    Permite al usuario ingresar una gramática, incluyendo símbolos no terminales,
    símbolos terminales, el símbolo inicial y las producciones.
    """
    global no_terminales, terminales, producciones, simbolo_inicial

    # Ingreso de los símbolos no terminales
    no_terminales = set(input("Ingrese los símbolos NO terminales separados por comas (ejemplo: S,A,B): ").split(","))

    # Ingreso de los símbolos terminales
    terminales = set(input("Ingrese los símbolos terminales separados por comas (ejemplo: a,b,c): ").split(","))

    # Ingreso del símbolo inicial
    simbolo_inicial = input("Ingrese el símbolo inicial: ").strip()

    # Ingreso de las producciones
    print("Ingrese las producciones (formato: NoTerminal->producciones separados por '|'). Ejemplo: S->aS|bA|\u03b5")
    print("Cuando termine, escriba 'fin'.")

    while True:
        linea = input()
        if linea.lower() == "fin":
            break

        # Dividir la línea en el símbolo no terminal y sus reglas
        no_terminal, reglas = linea.split("->")
        no_terminal = no_terminal.strip()  # Quitar espacios extra
        reglas = reglas.split("|")  # Separar las reglas por '|'

        # Agregar las producciones al diccionario
        producciones[no_terminal] = reglas

def verificar_frase(frase):
    """
    Verifica si una frase contiene únicamente símbolos terminales.

    Args:
        frase (str): La frase a verificar.

    Returns:
        bool: True si la frase contiene solo símbolos terminales, False en caso contrario.
    """
    for c in frase:
        if c not in terminales:
            return False
    return True

def generar_frase(simbolo):
    """
    Genera una frase válida a partir de un símbolo inicial siguiendo la gramática.

    Args:
        simbolo (str): El símbolo desde el cual generar la frase.

    Returns:
        str: Una frase válida generada.
    """
    if simbolo not in producciones:
        # Si el símbolo no tiene producciones, es terminal y se devuelve directamente
        return simbolo

    # Seleccionar una regla aleatoria de las producciones del símboloS,
    regla = random.choice(producciones[simbolo])

    if regla == "ε":
        # Si la regla es epsilon (cadena vacía), retorna una cadena vacía
        return ""

    resultado = ""
    for c in regla:
        # Si el símbolo es no terminal, realiza una llamada recursiva
        if c in no_terminales:
            resultado += generar_frase(c)
        else:
            # Si es terminal, simplemente lo agrega al resultado
            resultado += c
    return resultado

def main():
    """
    Función principal que permite al usuario interactuar con el programa.
    - Ingresar la gramática
    - Verificar si una frase pertenece a la gramática
    - Generar frases válidas
    """
    # Paso 1: Ingresar la gramática
    ingresar_gramatica()

    # Paso 2: Verificar una frase
    frase = input("Ingrese una frase para verificar si pertenece a la gramática: ").strip()
    if verificar_frase(frase):
        print("La frase pertenece a la gramática.")
    else:
        print("La frase NO pertenece a la gramática.")

    # Paso 3: Generar frases válidas
    print("\nGenerando dos frases válidas:")
    for _ in range(2):
        print(generar_frase(simbolo_inicial))

if __name__ == '__main__':
    main()