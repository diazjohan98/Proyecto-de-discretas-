import random

# Variables globales para almacenar la gramática
no_terminales = set()  
terminales = set() 
producciones = {} 
simbolo_inicial = ""  

def ingresar_gramatica():
    
    global no_terminales, terminales, producciones, simbolo_inicial

   
    no_terminales = set(input("Ingrese los símbolos NO terminales separados por comas (ejemplo: S,A,B): ").split(","))

    terminales = set(input("Ingrese los símbolos terminales separados por comas (ejemplo: a,b,c): ").split(","))

    simbolo_inicial = input("Ingrese el símbolo inicial: ").strip()

    print("Ingrese las producciones (formato: NoTerminal->producciones separados por '|'). Ejemplo: S->aS|bA|\ε")
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
    
    for c in frase:
        if c not in terminales:
            return False
    return True

def generar_frase(simbolo):
   
    if simbolo not in producciones:
        # Si el símbolo no tiene producciones, es terminal y se devuelve directamente
        return simbolo

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
    
    ingresar_gramatica()

    frase = input("Ingrese una frase para verificar si pertenece a la gramática: ").strip()
    if verificar_frase(frase):
        print("La frase pertenece a la gramática.")
    else:
        print("La frase NO pertenece a la gramática.")

    print("\nGenerando dos frases válidas:")
    for _ in range(2):
        print(generar_frase(simbolo_inicial))

if __name__ == '__main__':
    main()