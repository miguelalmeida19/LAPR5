:-module(startServer,
    [startServer/1
    ]).

% Bibliotecas
:- use_module(library(http/http_json)).
:- use_module(library(http/http_server)).
:- use_module(library(http/json)).
:- use_module(library(http/http_client)).
:- use_module(library(http/http_open)).
:- use_module(library(dcg/basics)).

%% Nossos modulos

:-ensure_loaded("./SprintC for Server.pl").

%% Base Conhecimento principal

:- dynamic entrega/6.

% Gerir servidor
startServer(Port) :-
    http_server(http_dispatch, [port(Port)]),
    asserta(port(Port)).

stopServer:-
    retract(port(Port)),
    http_stop_server(Port,_).

%Porta default para o server
%default_server_port(4000).
default_server_port(4000).

%url da API

%obter_deliveries_url("http://localhost:5000/api/deliveries").
obter_deliveries_url("http://vs614.dei.isep.ipp.pt/wm/api/deliveries").

:- http_handler(root(trucks), handle_trucks, []).

handle_trucks(_Request) :-
    number_of_trucks(Trucks), % Retrieve the list of trucks
    reply_json(json([trucks=Trucks])). % Return the result in the response

:- http_handler(root(generate/sublist), generate_sublist_handler, [method(post)]).

generate_sublist_handler(Request) :-
    http_read_json(Request, JSONIn, []),
    JSONIn = json([ng=NG, dp=DP, p1=P1, p2=P2, truck1=Truck1]),
    gera_with_parameters(NG, DP, P1, P2, Truck1, Z, H),
    arg(1, H, List),
    format('Content-type: application/json~n~n'),
    format('{"Z": "~w", "H": ~w}', [Z, List]).


:- http_handler(root(deliveries), get_deliveries, []).

:- http_handler(root(update), updateData, []).

updateData(Request) :-
    format('Data updated!').

get_deliveries(Request) :-
    seq_tempo_min(LE,LCarregamentos,Tempo),
    Data = json{ld: LE, lchargements: LCarregamentos, time: Tempo},
    reply_json_dict(Data).

parse_deliveries(List):-
    forall(member(JsonObject, List),
           (term_string(Weight, JsonObject.weight),
            string_concat(JsonObject.year,JsonObject.month,YearMonth),
            string_concat(YearMonth,JsonObject.day,YearMonthDay),
            number_codes(WarehouseId, JsonObject.warehouseId),
            term_string(PlacingTime, JsonObject.placingTime),
            term_string(RemovingTime, JsonObject.removingTime),
            asserta(entrega(JsonObject.id, YearMonthDay, Weight, WarehouseId, PlacingTime, RemovingTime)))).

obterEntregas(Result) :-
  obter_deliveries_url(URL),
  http_open(URL, In, [ cert_verify_hook(cert_accept_any)]),
  json_read_dict(In, Data),
  parse_deliveries(Data),
  % forall(member(JsonObject, Data), json_write_dict(current_output, JsonObject)),
  close(In).

% Adiciona as Entregas ao Sistema
adicionarEntregas():-
    obterEntregas(Data).

% Remover dados do sistema
removerBaseConhecimento():-
        retractall(entrega(_,_,_,_,_,_)).

%Métodos que carregam os dados para sistema
carregar_dados_sistema():-
    adicionarEntregas().

% Requests


inicializar_server:-
    default_server_port(Port),
    startServer(Port),!,
    carregar_dados_sistema(),!.

:- inicializar_server.