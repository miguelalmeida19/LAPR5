:- discontiguous remove_duplicates/2.
:- discontiguous split_list/4.
:- use_module(library(pairs)).
:- use_module(library(clpfd)).
:-dynamic geracoes/1.
:-dynamic entregas/1.
:-dynamic populacao/1.
:-dynamic prob_cruzamento/1.
:-dynamic prob_mutacao/1.
:- dynamic list/1.
:- dynamic (tempo_min/3).


% tarefa(Id,TempoProcessamento,TempConc,PesoPenalizacao).
tarefa(t1,2,5,1).
tarefa(t2,4,7,6).
tarefa(t3,1,11,2).
tarefa(t4,3,9,3).
tarefa(t5,3,8,2).

% tarefas(NTarefas).
tarefas(5).

%carateristicasCam(<nome_camiao>,<tara>,<capacidade_carga>,<carga_total_baterias>,<autonomia>,<t_recarr_bat_20a80>).
carateristicasCam(eTruck01,7500,4300,80,100,60).
%carateristicasCam(eTruck02,7500,5000,80,100,60).
%carateristicasCam(eTruck03,7500,3800,80,100,60).

%dadosCam_t_e_ta(<nome_camiao>,<cidade_origem>,<cidade_destino>,<tempo>,<energia>,<tempo_adicional>).
dadosCam_t_e_ta(eTruck01,1,1,0,0,0).
dadosCam_t_e_ta(eTruck01,2,2,0,0,0).
dadosCam_t_e_ta(eTruck01,3,3,0,0,0).
dadosCam_t_e_ta(eTruck01,4,4,0,0,0).
dadosCam_t_e_ta(eTruck01,5,5,0,0,0).
dadosCam_t_e_ta(eTruck01,6,6,0,0,0).
dadosCam_t_e_ta(eTruck01,7,7,0,0,0).
dadosCam_t_e_ta(eTruck01,8,8,0,0,0).
dadosCam_t_e_ta(eTruck01,9,9,0,0,0).
dadosCam_t_e_ta(eTruck01,10,10,0,0,0).
dadosCam_t_e_ta(eTruck01,11,11,0,0,0).
dadosCam_t_e_ta(eTruck01,12,12,0,0,0).
dadosCam_t_e_ta(eTruck01,13,13,0,0,0).
dadosCam_t_e_ta(eTruck01,14,14,0,0,0).
dadosCam_t_e_ta(eTruck01,15,15,0,0,0).
dadosCam_t_e_ta(eTruck01,16,16,0,0,0).
dadosCam_t_e_ta(eTruck01,17,17,0,0,0).

dadosCam_t_e_ta(eTruck01,1,2,122,42,0).
dadosCam_t_e_ta(eTruck01,1,3,122,46,0).
dadosCam_t_e_ta(eTruck01,1,4,151,54,25).
dadosCam_t_e_ta(eTruck01,1,5,147,52,25).
dadosCam_t_e_ta(eTruck01,1,6,74,24,0).
dadosCam_t_e_ta(eTruck01,1,7,116,35,0).
dadosCam_t_e_ta(eTruck01,1,8,141,46,0).
dadosCam_t_e_ta(eTruck01,1,9,185,74,53).
dadosCam_t_e_ta(eTruck01,1,10,97,30,0).
dadosCam_t_e_ta(eTruck01,1,11,164,64,40).
dadosCam_t_e_ta(eTruck01,1,12,76,23,0).
dadosCam_t_e_ta(eTruck01,1,13,174,66,45).
dadosCam_t_e_ta(eTruck01,1,14,59,18,0).
dadosCam_t_e_ta(eTruck01,1,15,132,51,24).
dadosCam_t_e_ta(eTruck01,1,16,181,68,45).
dadosCam_t_e_ta(eTruck01,1,17,128,45,0).

dadosCam_t_e_ta(eTruck01,2,1,116,42,0).
dadosCam_t_e_ta(eTruck01,2,3,55,22,0).
dadosCam_t_e_ta(eTruck01,2,4,74,25,0).
dadosCam_t_e_ta(eTruck01,2,5,65,22,0).
dadosCam_t_e_ta(eTruck01,2,6,69,27,0).
dadosCam_t_e_ta(eTruck01,2,7,74,38,0).
dadosCam_t_e_ta(eTruck01,2,8,61,18,0).
dadosCam_t_e_ta(eTruck01,2,9,103,44,0).
dadosCam_t_e_ta(eTruck01,2,10,36,14,0).
dadosCam_t_e_ta(eTruck01,2,11,88,41,0).
dadosCam_t_e_ta(eTruck01,2,12,61,19,0).
dadosCam_t_e_ta(eTruck01,2,13,95,42,0).
dadosCam_t_e_ta(eTruck01,2,14,78,34,0).
dadosCam_t_e_ta(eTruck01,2,15,69,30,0).
dadosCam_t_e_ta(eTruck01,2,16,99,38,0).
dadosCam_t_e_ta(eTruck01,2,17,46,14,0).

dadosCam_t_e_ta(eTruck01,3,1,120,45,0).
dadosCam_t_e_ta(eTruck01,3,2,50,22,0).
dadosCam_t_e_ta(eTruck01,3,4,46,15,0).
dadosCam_t_e_ta(eTruck01,3,5,46,14,0).
dadosCam_t_e_ta(eTruck01,3,6,74,37,0).
dadosCam_t_e_ta(eTruck01,3,7,63,23,0).
dadosCam_t_e_ta(eTruck01,3,8,38,8,0).
dadosCam_t_e_ta(eTruck01,3,9,84,36,0).
dadosCam_t_e_ta(eTruck01,3,10,59,28,0).
dadosCam_t_e_ta(eTruck01,3,11,61,27,0).
dadosCam_t_e_ta(eTruck01,3,12,67,32,0).
dadosCam_t_e_ta(eTruck01,3,13,67,29,0).
dadosCam_t_e_ta(eTruck01,3,14,82,38,0).
dadosCam_t_e_ta(eTruck01,3,15,34,8,0).
dadosCam_t_e_ta(eTruck01,3,16,80,30,0).
dadosCam_t_e_ta(eTruck01,3,17,36,10,0).

dadosCam_t_e_ta(eTruck01,4,1,149,54,25).
dadosCam_t_e_ta(eTruck01,4,2,65,24,0).
dadosCam_t_e_ta(eTruck01,4,3,46,16,0).
dadosCam_t_e_ta(eTruck01,4,5,27,10,0).
dadosCam_t_e_ta(eTruck01,4,6,103,47,0).
dadosCam_t_e_ta(eTruck01,4,7,55,27,0).
dadosCam_t_e_ta(eTruck01,4,8,36,10,0).
dadosCam_t_e_ta(eTruck01,4,9,50,26,0).
dadosCam_t_e_ta(eTruck01,4,10,78,34,0).
dadosCam_t_e_ta(eTruck01,4,11,42,19,0).
dadosCam_t_e_ta(eTruck01,4,12,97,42,0).
dadosCam_t_e_ta(eTruck01,4,13,44,11,0).
dadosCam_t_e_ta(eTruck01,4,14,111,48,0).
dadosCam_t_e_ta(eTruck01,4,15,32,13,0).
dadosCam_t_e_ta(eTruck01,4,16,53,14,0).
dadosCam_t_e_ta(eTruck01,4,17,38,11,0).

dadosCam_t_e_ta(eTruck01,5,1,141,51,24).
dadosCam_t_e_ta(eTruck01,5,2,55,20,0).
dadosCam_t_e_ta(eTruck01,5,3,48,14,0).
dadosCam_t_e_ta(eTruck01,5,4,25,9,0).
dadosCam_t_e_ta(eTruck01,5,6,97,44,0).
dadosCam_t_e_ta(eTruck01,5,7,55,28,0).
dadosCam_t_e_ta(eTruck01,5,8,29,7,0).
dadosCam_t_e_ta(eTruck01,5,9,48,24,0).
dadosCam_t_e_ta(eTruck01,5,10,69,30,0).
dadosCam_t_e_ta(eTruck01,5,11,53,26,0).
dadosCam_t_e_ta(eTruck01,5,12,95,36,0).
dadosCam_t_e_ta(eTruck01,5,13,63,20,0).
dadosCam_t_e_ta(eTruck01,5,14,105,45,0).
dadosCam_t_e_ta(eTruck01,5,15,34,14,0).
dadosCam_t_e_ta(eTruck01,5,16,46,18,0).
dadosCam_t_e_ta(eTruck01,5,17,27,7,0).

dadosCam_t_e_ta(eTruck01,6,1,69,23,0).
dadosCam_t_e_ta(eTruck01,6,2,71,27,0).
dadosCam_t_e_ta(eTruck01,6,3,74,38,0).
dadosCam_t_e_ta(eTruck01,6,4,103,46,0).
dadosCam_t_e_ta(eTruck01,6,5,99,44,0).
dadosCam_t_e_ta(eTruck01,6,7,88,48,0).
dadosCam_t_e_ta(eTruck01,6,8,92,38,0).
dadosCam_t_e_ta(eTruck01,6,9,134,66,45).
dadosCam_t_e_ta(eTruck01,6,10,42,14,0).
dadosCam_t_e_ta(eTruck01,6,11,116,56,30).
dadosCam_t_e_ta(eTruck01,6,12,23,9,0).
dadosCam_t_e_ta(eTruck01,6,13,126,58,33).
dadosCam_t_e_ta(eTruck01,6,14,25,9,0).
dadosCam_t_e_ta(eTruck01,6,15,84,44,0).
dadosCam_t_e_ta(eTruck01,6,16,132,60,35).
dadosCam_t_e_ta(eTruck01,6,17,80,38,0).

dadosCam_t_e_ta(eTruck01,7,1,116,36,0).
dadosCam_t_e_ta(eTruck01,7,2,71,38,0).
dadosCam_t_e_ta(eTruck01,7,3,61,22,0).
dadosCam_t_e_ta(eTruck01,7,4,53,26,0).
dadosCam_t_e_ta(eTruck01,7,5,53,28,0).
dadosCam_t_e_ta(eTruck01,7,6,88,48,0).
dadosCam_t_e_ta(eTruck01,7,8,59,26,0).
dadosCam_t_e_ta(eTruck01,7,9,88,48,0).
dadosCam_t_e_ta(eTruck01,7,10,84,44,0).
dadosCam_t_e_ta(eTruck01,7,11,74,22,0).
dadosCam_t_e_ta(eTruck01,7,12,82,42,0).
dadosCam_t_e_ta(eTruck01,7,13,76,31,0).
dadosCam_t_e_ta(eTruck01,7,14,97,49,21).
dadosCam_t_e_ta(eTruck01,7,15,29,16,0).
dadosCam_t_e_ta(eTruck01,7,16,84,42,0).
dadosCam_t_e_ta(eTruck01,7,17,69,30,0).

dadosCam_t_e_ta(eTruck01,8,1,134,46,0).
dadosCam_t_e_ta(eTruck01,8,2,59,18,0).
dadosCam_t_e_ta(eTruck01,8,3,32,6,0).
dadosCam_t_e_ta(eTruck01,8,4,34,10,0).
dadosCam_t_e_ta(eTruck01,8,5,32,7,0).
dadosCam_t_e_ta(eTruck01,8,6,88,38,0).
dadosCam_t_e_ta(eTruck01,8,7,57,26,0).
dadosCam_t_e_ta(eTruck01,8,9,69,30,0).
dadosCam_t_e_ta(eTruck01,8,10,65,26,0).
dadosCam_t_e_ta(eTruck01,8,11,53,22,0).
dadosCam_t_e_ta(eTruck01,8,12,82,34,0).
dadosCam_t_e_ta(eTruck01,8,13,61,24,0).
dadosCam_t_e_ta(eTruck01,8,14,97,40,0).
dadosCam_t_e_ta(eTruck01,8,15,36,12,0).
dadosCam_t_e_ta(eTruck01,8,16,65,23,0).
dadosCam_t_e_ta(eTruck01,8,17,32,6,0).

dadosCam_t_e_ta(eTruck01,9,1,181,72,50).
dadosCam_t_e_ta(eTruck01,9,2,95,41,0).
dadosCam_t_e_ta(eTruck01,9,3,86,35,0).
dadosCam_t_e_ta(eTruck01,9,4,55,24,0).
dadosCam_t_e_ta(eTruck01,9,5,48,23,0).
dadosCam_t_e_ta(eTruck01,9,6,134,65,42).
dadosCam_t_e_ta(eTruck01,9,7,95,47,0).
dadosCam_t_e_ta(eTruck01,9,8,69,28,0).
dadosCam_t_e_ta(eTruck01,9,10,109,51,24).
dadosCam_t_e_ta(eTruck01,9,11,61,29,0).
dadosCam_t_e_ta(eTruck01,9,12,132,57,31).
dadosCam_t_e_ta(eTruck01,9,13,67,19,0).
dadosCam_t_e_ta(eTruck01,9,14,143,66,45).
dadosCam_t_e_ta(eTruck01,9,15,71,34,0).
dadosCam_t_e_ta(eTruck01,9,16,15,3,0).
dadosCam_t_e_ta(eTruck01,9,17,67,28,0).

dadosCam_t_e_ta(eTruck01,10,1,97,30,0).
dadosCam_t_e_ta(eTruck01,10,2,34,14,0).
dadosCam_t_e_ta(eTruck01,10,3,59,27,0).
dadosCam_t_e_ta(eTruck01,10,4,78,33,0).
dadosCam_t_e_ta(eTruck01,10,5,71,30,0).
dadosCam_t_e_ta(eTruck01,10,6,40,14,0).
dadosCam_t_e_ta(eTruck01,10,7,82,42,0).
dadosCam_t_e_ta(eTruck01,10,8,65,24,0).
dadosCam_t_e_ta(eTruck01,10,9,109,52,25).
dadosCam_t_e_ta(eTruck01,10,11,92,46,0).
dadosCam_t_e_ta(eTruck01,10,12,32,6,0).
dadosCam_t_e_ta(eTruck01,10,13,99,46,0).
dadosCam_t_e_ta(eTruck01,10,14,63,17,0).
dadosCam_t_e_ta(eTruck01,10,15,74,34,0).
dadosCam_t_e_ta(eTruck01,10,16,105,46,0).
dadosCam_t_e_ta(eTruck01,10,17,53,23,0).

dadosCam_t_e_ta(eTruck01,11,1,164,65,42).
dadosCam_t_e_ta(eTruck01,11,2,88,41,0).
dadosCam_t_e_ta(eTruck01,11,3,65,28,0).
dadosCam_t_e_ta(eTruck01,11,4,42,18,0).
dadosCam_t_e_ta(eTruck01,11,5,55,25,0).
dadosCam_t_e_ta(eTruck01,11,6,118,57,31).
dadosCam_t_e_ta(eTruck01,11,7,74,23,0).
dadosCam_t_e_ta(eTruck01,11,8,59,23,0).
dadosCam_t_e_ta(eTruck01,11,9,63,28,0).
dadosCam_t_e_ta(eTruck01,11,10,97,46,0).
dadosCam_t_e_ta(eTruck01,11,12,111,52,25).
dadosCam_t_e_ta(eTruck01,11,13,25,7,0).
dadosCam_t_e_ta(eTruck01,11,14,126,58,33).
dadosCam_t_e_ta(eTruck01,11,15,53,25,0).
dadosCam_t_e_ta(eTruck01,11,16,59,27,0).
dadosCam_t_e_ta(eTruck01,11,17,67,27,0).

dadosCam_t_e_ta(eTruck01,12,1,76,23,0).
dadosCam_t_e_ta(eTruck01,12,2,61,19,0).
dadosCam_t_e_ta(eTruck01,12,3,67,32,0).
dadosCam_t_e_ta(eTruck01,12,4,97,41,0).
dadosCam_t_e_ta(eTruck01,12,5,92,38,0).
dadosCam_t_e_ta(eTruck01,12,6,19,8,0).
dadosCam_t_e_ta(eTruck01,12,7,82,42,0).
dadosCam_t_e_ta(eTruck01,12,8,86,33,0).
dadosCam_t_e_ta(eTruck01,12,9,128,61,37).
dadosCam_t_e_ta(eTruck01,12,10,32,6,0).
dadosCam_t_e_ta(eTruck01,12,11,109,50,23).
dadosCam_t_e_ta(eTruck01,12,13,120,53,26).
dadosCam_t_e_ta(eTruck01,12,14,40,10,0).
dadosCam_t_e_ta(eTruck01,12,15,78,38,0).
dadosCam_t_e_ta(eTruck01,12,16,126,54,28).
dadosCam_t_e_ta(eTruck01,12,17,74,32,0).

dadosCam_t_e_ta(eTruck01,13,1,174,65,42).
dadosCam_t_e_ta(eTruck01,13,2,107,35,0).
dadosCam_t_e_ta(eTruck01,13,3,74,29,0).
dadosCam_t_e_ta(eTruck01,13,4,46,11,0).
dadosCam_t_e_ta(eTruck01,13,5,67,20,0).
dadosCam_t_e_ta(eTruck01,13,6,128,57,31).
dadosCam_t_e_ta(eTruck01,13,7,80,30,0).
dadosCam_t_e_ta(eTruck01,13,8,76,20,0).
dadosCam_t_e_ta(eTruck01,13,9,67,20,0).
dadosCam_t_e_ta(eTruck01,13,10,105,47,0).
dadosCam_t_e_ta(eTruck01,13,11,27,7,0).
dadosCam_t_e_ta(eTruck01,13,12,122,52,25).
dadosCam_t_e_ta(eTruck01,13,14,137,58,33).
dadosCam_t_e_ta(eTruck01,13,15,67,17,0).
dadosCam_t_e_ta(eTruck01,13,16,59,15,0).
dadosCam_t_e_ta(eTruck01,13,17,78,22,0).

dadosCam_t_e_ta(eTruck01,14,1,59,18,0).
dadosCam_t_e_ta(eTruck01,14,2,80,35,0).
dadosCam_t_e_ta(eTruck01,14,3,80,38,0).
dadosCam_t_e_ta(eTruck01,14,4,109,46,0).
dadosCam_t_e_ta(eTruck01,14,5,105,45,0).
dadosCam_t_e_ta(eTruck01,14,6,27,9,0).
dadosCam_t_e_ta(eTruck01,14,7,97,48,0).
dadosCam_t_e_ta(eTruck01,14,8,99,38,0).
dadosCam_t_e_ta(eTruck01,14,9,143,66,45).
dadosCam_t_e_ta(eTruck01,14,10,61,17,0).
dadosCam_t_e_ta(eTruck01,14,11,122,57,31).
dadosCam_t_e_ta(eTruck01,14,12,42,10,0).
dadosCam_t_e_ta(eTruck01,14,13,132,58,35).
dadosCam_t_e_ta(eTruck01,14,15,90,44,0).
dadosCam_t_e_ta(eTruck01,14,16,139,61,37).
dadosCam_t_e_ta(eTruck01,14,17,86,38,0).

dadosCam_t_e_ta(eTruck01,15,1,132,51,24).
dadosCam_t_e_ta(eTruck01,15,2,74,30,0).
dadosCam_t_e_ta(eTruck01,15,3,34,8,0).
dadosCam_t_e_ta(eTruck01,15,4,36,12,0).
dadosCam_t_e_ta(eTruck01,15,5,36,14,0).
dadosCam_t_e_ta(eTruck01,15,6,86,44,0).
dadosCam_t_e_ta(eTruck01,15,7,34,16,0).
dadosCam_t_e_ta(eTruck01,15,8,42,13,0).
dadosCam_t_e_ta(eTruck01,15,9,71,35,0).
dadosCam_t_e_ta(eTruck01,15,10,82,36,0).
dadosCam_t_e_ta(eTruck01,15,11,53,25,0).
dadosCam_t_e_ta(eTruck01,15,12,80,38,0).
dadosCam_t_e_ta(eTruck01,15,13,69,18,0).
dadosCam_t_e_ta(eTruck01,15,14,95,45,0).
dadosCam_t_e_ta(eTruck01,15,16,69,29,0).
dadosCam_t_e_ta(eTruck01,15,17,53,17,0).

dadosCam_t_e_ta(eTruck01,16,1,179,68,45).
dadosCam_t_e_ta(eTruck01,16,2,92,37,0).
dadosCam_t_e_ta(eTruck01,16,3,84,31,0).
dadosCam_t_e_ta(eTruck01,16,4,57,16,0).
dadosCam_t_e_ta(eTruck01,16,5,46,18,0).
dadosCam_t_e_ta(eTruck01,16,6,132,60,35).
dadosCam_t_e_ta(eTruck01,16,7,92,42,0).
dadosCam_t_e_ta(eTruck01,16,8,67,23,0).
dadosCam_t_e_ta(eTruck01,16,9,15,3,0).
dadosCam_t_e_ta(eTruck01,16,10,105,46,0).
dadosCam_t_e_ta(eTruck01,16,11,57,28,0).
dadosCam_t_e_ta(eTruck01,16,12,130,52,25).
dadosCam_t_e_ta(eTruck01,16,13,61,15,0).
dadosCam_t_e_ta(eTruck01,16,14,141,61,37).
dadosCam_t_e_ta(eTruck01,16,15,69,29,0).
dadosCam_t_e_ta(eTruck01,16,17,65,24,0).

dadosCam_t_e_ta(eTruck01,17,1,128,46,0).
dadosCam_t_e_ta(eTruck01,17,2,42,14,0).
dadosCam_t_e_ta(eTruck01,17,3,40,11,0).
dadosCam_t_e_ta(eTruck01,17,4,42,13,0).
dadosCam_t_e_ta(eTruck01,17,5,34,10,0).
dadosCam_t_e_ta(eTruck01,17,6,82,38,0).
dadosCam_t_e_ta(eTruck01,17,7,74,30,0).
dadosCam_t_e_ta(eTruck01,17,8,29,6,0).
dadosCam_t_e_ta(eTruck01,17,9,69,31,0).
dadosCam_t_e_ta(eTruck01,17,10,55,24,0).
dadosCam_t_e_ta(eTruck01,17,11,69,29,0).
dadosCam_t_e_ta(eTruck01,17,12,80,30,0).
dadosCam_t_e_ta(eTruck01,17,13,82,23,0).
dadosCam_t_e_ta(eTruck01,17,14,90,38,0).
dadosCam_t_e_ta(eTruck01,17,15,53,18,0).
dadosCam_t_e_ta(eTruck01,17,16,67,25,0).




%idArmazem(<local>,<codigo>)
idArmazem('Arouca',1).
idArmazem('Espinho',2).
idArmazem('Gondomar',3).
idArmazem('Maia',4).
idArmazem('Matosinhos',5).
idArmazem('Oliveira de Azemeis',6).
idArmazem('Paredes',7).
idArmazem('Porto',8).
idArmazem('Povoa de Varzim',9).
idArmazem('Santa Maria da Feira',10).
idArmazem('Santo Tirso',11).
idArmazem('Sao Joao da Madeira',12).
idArmazem('Trofa',13).
idArmazem('Vale de Cambra',14).
idArmazem('Valongo',15).
idArmazem('Vila do Conde',16).
idArmazem('Vila Nova de Gaia',17).

armazemPrincipal('Matosinhos',5).


    
% ------------------------------------------

%entrega(<idEntrega>,<data>,<massaEntrega>,<armazemEntrega>,<tempoColoc>,<tempoRet>)
%entrega(4439, 20221205, 200, 1, 8, 10).
%entrega(4438, 20221205, 200, 9, 7, 9).
%entrega(4445, 20221205, 100, 3, 5, 7).
%entrega(4443, 20221205, 120, 8, 6, 8).
%entrega(4449, 20221205, 300, 11, 15, 20).

%entrega(4398, 20221205, 310, 17, 16, 20).
%entrega(4432, 20221205, 270, 14, 14, 18).
%entrega(4437, 20221205, 180, 12, 9, 11).
%entrega(4451, 20221205, 220, 6, 9, 12).
%entrega(4452, 20221205, 390, 13, 21, 26).
%entrega(4444, 20221205, 380, 2, 20, 25).
%entrega(4455, 20221205, 280, 7, 14, 19).
%entrega(4399, 20221205, 260, 15, 13, 18).
%entrega(4454, 20221205, 350, 10, 18, 22).
%entrega(4446, 20221205, 260, 4, 14, 17).
%entrega(4456, 20221205, 330, 16, 17, 21).

%%novas entregas
entrega(7439, 20230111, 2200, 1, 72, 82).
entrega(7438, 20230111, 3000, 9, 95, 110).
entrega(7445, 20230111, 380, 3, 21, 26).
entrega(7443, 20230111, 120, 8, 6, 8).
entrega(7449, 20230111, 300, 11, 15, 20).
entrega(7398, 20230111, 310, 17, 16, 20).
entrega(7432, 20230111, 1700, 14, 55, 65).
entrega(7437, 20230111, 250, 12, 13, 16).
entrega(7451, 20230111, 1440, 6, 48, 59).
entrega(7452, 20230111, 1400, 13, 47, 58).
entrega(7444, 20230111, 390, 2, 20, 25).
entrega(7455, 20230111, 560, 7, 28, 38).
entrega(7399, 20230111, 260, 15, 13, 18).
entrega(7454, 20230111, 350, 10, 18, 22).
entrega(7446, 20230111, 260, 4, 14, 17).
entrega(7456, 20230111, 1500, 16, 50, 59).

entregas(16).



%a soma_pesos
soma_pesos([],[],0).
soma_pesos([ID|LC],[PesoAc|LP],PesoAc):-
    soma_pesos(LC,LP,PesoAc1),entrega(_,_,Peso,ID,_,_),PesoAc is Peso+PesoAc1.

% -------------------------------------------

%b acrescenta_tara
acrescenta_tara(Tara,[],[Tara]).
acrescenta_tara(Tara,[Peso|LP],[PesoTara|LPT]):-
    acrescenta_tara(Tara,LP,LPT),
    PesoTara is Peso+Tara.

% --------------------------------------------------------------------------

calcula_tempo_energia(Tempo,Energia,CargaMax,PesoAtual,R,R1):-
    R is PesoAtual*Tempo/CargaMax,
    R1 is PesoAtual*Energia/CargaMax.

energia_disponivel(EnergiaDispo,EnergiaGast,BateriaTotal,TempoExtra,R,TempoExtraAdicionado):-
    abaixo_vinte_percent(BateriaTotal,Bateria),
    ((EnergiaGast<Bateria,!,Gasta is Bateria,TempoExtraAdicionado is 0);(Gasta is EnergiaGast,TempoExtraAdicionado is TempoExtra)),
    R is EnergiaDispo-Gasta.

abaixo_vinte_percent(BateriaTotal,Bateria):-
    Bateria is BateriaTotal*0.20.

carregar_oitenta(BateriaTotal,Bateria):-
    Bateria is BateriaTotal*0.80.

tempo_carregamento(R1,BateriaTotal,TRecarga,TempoExtra,TCarga,TempoExtraAdicionado):-
    carregar_oitenta(BateriaTotal,Bateria),
    energia_disponivel(Bateria,R1,BateriaTotal,TempoExtra,R,TempoExtraAdicionado),
    TCarga is R * TRecarga/48.

%c calcula_custo
calcula_custo(LC,Custo,LEcarregamentos,Camiao):-
    soma_pesos(LC,LP,_),
    carateristicasCam(Camiao,Tara,_,Autonomia,_,_),
    acrescenta_tara(Tara,LP,LPT),
    armazemPrincipal(_,Cin),
    append([Cin|LC],[Cin],LCcompleto),
    custo(LCcompleto,LPT,Autonomia,Custo,Camiao,LEcarregamentos). % Ele come a com a autonomia maxima

is_empty(List):- not(member(_,List)).

custo([_],[],_,0,_,[]).
custo([C1,C2|LC],[PT|LPT],Autonomia,Custo,Camiao,LEcarregamentos):-
    %write("Autonomia no armazem "),write(C1),write(": "),write(Autonomia),nl,
    (dadosCam_t_e_ta(Camiao,C1,C2,Tempo,Energia,TempoExtra);dadosCam_t_e_ta(Camiao,C2,C1,Tempo,Energia,TempoExtra)),
    %write("Tempo Extra: "),write(TempoExtra),nl,
    carateristicasCam(Camiao,TT,CC,CTB,_,TR),
    Total is TT + CC,
    calcula_tempo_energia(Tempo,Energia,Total,PT,R,R1), % Aqui calcula o tempo e a energia entre 2 armaz ns consoante o peso
    (((is_empty(LC)),!,TempoDescarga is 0);(entrega(_,_,_,C2,_,TempoDescarga))),
    %write("Vai gastar "),write(R1),write(" a ir do "),write(C1),write(" para o "),write(C2),nl,
    %write("Tempo Descarga no armazem: "),write(C2),write(" : "),write(TempoDescarga),nl,
    ((Autonomia<R1,!,tempo_carregamento(Autonomia,CTB,TR,TempoExtra,TCarga,TempoExtraAdicionado),
    carregar_oitenta(CTB,A),A1 is A-R1,LEcarregamentos=[C1|LEcarregou],
    %write("Tempo Carga no armazem "),write(C1),write(" : "),write(TCarga),nl,nl,
    ((TCarga>TempoDescarga,!,TGasto is TCarga+TempoExtraAdicionado);TGasto is TempoDescarga+TempoExtraAdicionado)); % Aqui, ver qual dos tempos   maior e considerar esse
    (A1 is Autonomia-R1,TGasto is TempoDescarga,LEcarregamentos=LEcarregou)), % Considerar apenas o tempo de Descarregar
    custo([C2|LC],LPT,A1,Custo1,Camiao,LEcarregou),
    Custo is Custo1+R+TGasto.


	armazem_mais_prox([X],I,Max,A):-dadosCam_t_e_ta(_, I, X, T,_ ,_ ), Max is T, A is X, !.
	armazem_mais_prox([X|LA], I,Max,A):-
    dadosCam_t_e_ta(_, I, X, T,_ ,_ ),
    armazem_mais_prox(LA,I,Max1,A1), ((T<Max1,!,Max is T, A is X); Max is Max1,A is A1).


	lista_custo([],_,[]):-!.
	lista_custo(LA,I,[A|LF]):-
    armazem_mais_prox(LA,I,_,A),
    !,
    select(A, LA, LI), !,
    lista_custo(LI,A,LF).

%-------------------------------------------------------------------------------------------------------------------


% parameterizacao
inicializa:-write('Numero de novas Geracoes: '),read(NG), 			
	(retract(geracoes(_));true), asserta(geracoes(NG)),
	write('Dimensao da Populacao: '),read(DP),
	(retract(populacao(_));true), asserta(populacao(DP)),
	write('Probabilidade de Cruzamento (%):'), read(P1),
	PC is P1/100, 
	(retract(prob_cruzamento(_));true), 	asserta(prob_cruzamento(PC)),
	write('Probabilidade de Mutacao (%):'), read(P2),
	PM is P2/100, 
	(retract(prob_mutacao(_));true), asserta(prob_mutacao(PM)).

run_gera(0,_):-
		display_list.
run_gera(N, Counter) :-
    N > 0,
    entregas_truck_gene(Truck1,Truck2,Truck3),
	generate_trucks(Truck1,Truck2,Truck3,Num1,Num2,Num3,SplitWeights1,SplitWeights2,SplitWeights3),
	NUMBER is Num1+Num2+Num3,
	write('Number of sublists: '), write(NUMBER),nl,

    (   Counter =:= 1 ->retractall(entregas(16)),process_sublists(SplitWeights1), length(Truck1,Length)
    ;   Counter =:= 2 ->process_sublists(SplitWeights2),length(Truck2,Length1)
    ;   Counter =:= 3 ->process_sublists(SplitWeights3),length(Truck3,Length2),retractall(entregas(Length2)),assert(entregas(16))
    ),
    Counter1 is Counter + 1,
    N1 is N - 1,
    run_gera(N1, Counter1).

gera(Truck1):-
	inicializa,
	gera_populacao(Truck1, Pop),
	write('Pop='),write(Pop),nl,
	gera_primeiro(Pop,Pop_Heuri),
	avalia_populacao(Pop_Heuri,PopAv),
	write('PopAv='),write(PopAv),nl,
	ordena_populacao(PopAv,PopOrd),
	geracoes(NG),
	get_time(Tinicial),
	gera_geracao_with_z(0,NG,PopOrd,Tinicial,Z,_),
	length(Truck1,Length),
	write('Z='),write(Z),nl,
	add_to_list(Z),
	retractall(entregas(Length)).



add_to_list(X) :-
    assert(list(X)).



display_list :-
    findall(X, list(X), List),
    max_member(Max, List),
    write('Time to finish all deliveries: '),write(Max),
	retractall(List),
	retractall(list(X)).

process_sublists(Truck1):-
	findall(Sublist, member(Sublist, Truck1), Sublists),
	foreach(member(Sublist, Sublists),
	gera(Sublist)).


generate_trucks(Truck1,Truck2,Truck3,Num1,Num2,Num3,SplitWeights1,SplitWeights2,SplitWeights3):-
	findall(ArmazemEntrega,entrega(ArmazemEntrega,_,_,_,_,_),ListaEntregas),
	match_and_sortW(L1,ListaEntregas,Truck1),
	match_and_sortW(L2,ListaEntregas,Truck2),
	match_and_sortW(L3,ListaEntregas,Truck3),
	get_massa(L1, ListaMassa1,MassaTotal1),
	get_massa(L2, ListaMassa2,MassaTotal2),
	get_massa(L3, ListaMassa3,MassaTotal3),
	truck_region(MassaTotal1,Num1),
	truck_region(MassaTotal2,Num2),
	truck_region(MassaTotal3,Num3),
	split_weights(ListaMassa1, 4300, SplitWeights1B),
	split_weights(ListaMassa2, 4300, SplitWeights2B),
	split_weights(ListaMassa3, 4300, SplitWeights3B),
	match_and_sortWarehouse(SplitWeights1,Truck1,SplitWeights1B),
	match_and_sortWarehouse(SplitWeights2,Truck2,SplitWeights2B),
	match_and_sortWarehouse(SplitWeights3,Truck3,SplitWeights3B).




truck_region(MassaTotal,Num):-
	P is MassaTotal/4300,
	ceiling(P,Num).



get_massa(IdsEntregas, ListaMassa,MassaTotal):-
        findall(Massa, (member(Id, IdsEntregas), entrega( Id, _, Massa,_, _, _)), ListaMassa),
		sum_list(ListaMassa, MassaTotal).

delivery_numbers(DeliveryIds, DeliveryNumbers) :-
    delivery_numbers(DeliveryIds, [], DeliveryNumbers),
	

delivery_numbers([], Acc, Acc).
delivery_numbers([Id|Ids], Acc, DeliveryNumbers) :-
    ( entrega(Number, _, _, Id, _, _) ->
        ( member(Id, Acc) ->
            Acc1 = Acc
        ; Acc1 = [Id|Acc]
        ),
        delivery_numbers(Ids, Acc1, DeliveryNumbers)
    ; delivery_numbers(Ids, Acc, DeliveryNumbers)
    ).


sum_weights(Warehouses, Sum) :-
    get_massa(Warehouses, ListaMassa,_),
	remove_duplicates(ListaMassa, R),
    sum_list(R, Sum).


sum_weights([], 0).
sum_weights([(_, Weight)|Ids], Total) :-
    sum_weights(Ids, SubTotal),
    Total is SubTotal + Weight.


split_weights(Weights, MaxWeight, SplitWeights) :-
    split_weights(Weights, MaxWeight, [], SplitWeights).


split_weights([], _, SplitWeights, SplitWeights).
split_weights(Weights, MaxWeight, Acc, SplitWeights) :-
    split_weights(Weights, MaxWeight, Acc, [], SplitWeights).


split_weights([], _, Acc, [], SplitWeights) :-
    append(Acc, [], SplitWeights).
split_weights([], _, Acc, TruckWeights, SplitWeights) :-
    append(Acc, [TruckWeights], SplitWeights).
split_weights([H|T], MaxWeight, Acc, TruckWeights, SplitWeights) :-
    (TruckWeights == [] -> NewTruckWeights = [H] ; append(TruckWeights, [H], NewTruckWeights)),
    sum_list(NewTruckWeights, TruckWeight),
    (TruckWeight =< MaxWeight ->
        split_weights(T, MaxWeight, Acc, NewTruckWeights, SplitWeights)
    ;
        (T == [] ->
            append(Acc, [TruckWeights], NewAcc),
            split_weights(T, MaxWeight, NewAcc, [H], SplitWeights)
        ;
            split_weights(T, MaxWeight, [TruckWeights|Acc], [H], SplitWeights)
        )
    ).


sum_list([], 0).
sum_list([H|T], Sum) :-
    sum_list(T, RestSum),
    Sum is H + RestSum.



gera_primeiro(Pop,Pop_Heuri):-
	nth1(1,Pop, H),
	lista_custo(H,5,H1),
	change_first_element(Pop, H1, Pop_Heuri).

remove_duplicates([], []):-!.
remove_duplicates([H|T], R) :- member(H, T),!, remove_duplicates(T, R).
remove_duplicates([H|T], [H|R]) :- \+ member(H, T), remove_duplicates(T, R).

get_warehouses(Ids, Warehouses) :-
    findall(Warehouse, (member(Id, Ids), entrega(Id, _, _, Warehouse, _, _)), Warehouses).




swap_pair_elements(List1, List2, NewList1, NewList2) :-
    swap_pair_elements(List1, List2, NewList1, NewList2, 0).

swap_pair_elements([], [], [], [], _).
swap_pair_elements([H1|T1], [H2|T2], [H1|NT1], [H2|NT2], N) :-
    0 is N mod 2,
    N1 is N + 1,
    swap_pair_elements(T1, T2, NT1, NT2, N1).
swap_pair_elements([H1|T1], [H2|T2], [H2|NT1], [H1|NT2], N) :-
    1 is N mod 2,
    N1 is N + 1,
    swap_pair_elements(T1, T2, NT1, NT2, N1).

swap_pair_elements([], [H2|T2], [], [H2|T2], _).
swap_pair_elements([H1|T1], [], [H1|T1], [], _).


split_list(InputList, OutputList1, OutputList2, OutputList3) :-
    split_list(InputList, [], OutputList1, [], OutputList2, [], OutputList3).

split_list([], Acc1, OutputList1, Acc2, OutputList2, Acc3, OutputList3) :-
    reverse(Acc1, OutputList1),
    reverse(Acc2, OutputList2),
    reverse(Acc3, OutputList3).
split_list([H|T], Acc1, OutputList1, Acc2, OutputList2, Acc3, OutputList3) :-
    (   H < 6
    ->  Acc1New = [H|Acc1],
        Acc2New = Acc2,
        Acc3New = Acc3
    ;   H < 12
    ->  Acc1New = Acc1,
        Acc2New = [H|Acc2],
        Acc3New = Acc3
    ;   Acc1New = Acc1,
        Acc2New = Acc2,
        Acc3New = [H|Acc3]
    ),
    split_list(T, Acc1New, OutputList1, Acc2New, OutputList2, Acc3New, OutputList3).

separar(L, A, B, C) :-
    separar(L, A, B, C, 1).

separar([], [], [], [], _).
separar([X|L], [X|A], B, C, N) :-
    N mod 3 =:= 1,
    N1 is N + 1,
    separar(L, A, B, C, N1).
separar([X|L], A, [X|B], C, N) :-
    N mod 3 =:= 2,
    N1 is N + 1,
    separar(L, A, B, C, N1).
separar([X|L], A, B, [X|C], N) :-
    N mod 3 =:= 0,
    N1 is N + 1,
    separar(L, A, B, C, N1).

entregas_truck(Truck1,Truck2,Truck3):-
	findall(IdEntrega,entrega(IdEntrega,_,_,_,_,_),ListaEntregas),
	findall(MassaEntrega,entrega(_,_,MassaEntrega,_,_,_),ListaMassas),
	ordem_inversa(ListaMassas,Sorted),
	match_and_sort(Auxiliar,ListaEntregas,Sorted),
	remove_duplicates(Auxiliar,Final),
	get_warehouses(Final,Warehouses),
	separar(Warehouses,Truck4,Truck2,Truck5),
	swap_pair_elements(Truck4,Truck5,Truck1,Truck3).



entregas_truck_gene(Truck1,Truck2,Truck3):-
	findall(ArmazemEntrega,entrega(_,_,_,ArmazemEntrega,_,_),ListaEntregas),
	split_list(ListaEntregas,Truck1,Truck2,Truck3).


match(X, Y,ListaEntregas,Sorted) :-
    member(Y, Sorted),
    member(X, ListaEntregas),
    entrega(X, _, Y, _, _, _).

    match_and_sort(UnsortedList,ListaEntregas,Sorted) :-
    findall(X, match(X, _,ListaEntregas,Sorted), UnsortedList).



matchW(X, Y,ListaEntregas,Sorted) :-
    member(Y, Sorted),
    member(X, ListaEntregas),
    entrega(X, _,_, Y, _, _).

match_and_sortW(UnsortedList,ListaEntregas,Sorted) :-
    findall(X, matchW(X, _,ListaEntregas,Sorted), UnsortedList1),
	remove_duplicates(UnsortedList1,UnsortedList).




match_and_sortWarehouse(Le, ListaEntregas, Sorted) :-
    findall(Sublist, (member(SortedSublist, Sorted), findall(X, (member(Y, SortedSublist), 
	member(X, ListaEntregas), entrega(_, _, Y, X, _, _)), Sublist)), Le).
matchWarehouse1(X, Y, ListaEntregas, SortedSublist) :-
    member(Y, SortedSublist),
    member(X, ListaEntregas),
    entrega(_, _, Y, X, _, _).

ordem_inversa(List,DescendingList):-
msort(List, SortedList),
reverse(SortedList, DescendingList).



gera_populacao(Truck1,Pop):-
    populacao(TamPop),
	length(Truck1, Length),
	assert(entregas(Length)),
    entregas(Length),
    findall(ArmazemEntrega,entrega(_,_,_,ArmazemEntrega,_,_),ListaEntregas),
    gera_populacao(TamPop,Truck1,Length,Pop).

gera_populacao(0,_,_,[]):-!.

gera_populacao(TamPop,ListaEntregas,NumE,[Ind|Resto]):-
    TamPop1 is TamPop-1,
    gera_populacao(TamPop1,ListaEntregas,NumE,Resto),
    gera_individuo(ListaEntregas,NumE,Ind),
    not(member(Ind,Resto)).
gera_populacao(TamPop,ListaEntregas,NumE,L):-
    gera_populacao(TamPop,ListaEntregas,NumE,L).

gera_individuo([G],1,[G]):-!.

gera_individuo(ListaEntregas,NumE,[G|Resto]):-
	NumTemp is NumE + 1, % To use with random
	random(1,NumTemp,N),
	retira(N,ListaEntregas,G,NovaLista),
	NumT1 is NumE-1,
	gera_individuo(NovaLista,NumT1,Resto).

retira(1,[G|Resto],G,Resto).
retira(N,[G1|Resto],G,[G1|Resto1]):-
	N1 is N-1,
	retira(N1,Resto,G,Resto1).

avalia_populacao([],[]).
avalia_populacao([Ind|Resto],[Ind*V|Resto1]):-
	calcula_custo(Ind,V,_,_),
	avalia_populacao(Resto,Resto1).

avalia(Seq,V):-
	avalia(Seq,0,V).

avalia([],_,0).
avalia([T|Resto],Inst,V):-
	tarefa(T,Dur,Prazo,Pen),
	InstFim is Inst+Dur,
	avalia(Resto,InstFim,VResto),
	(
		(InstFim =< Prazo,!, VT is 0)
  ;
		(VT is (InstFim-Prazo)*Pen)                     %%Realiza as contas necessárias para perceber onde falha no tempo e vê o peso atrasado
	),
	V is VT+VResto.

ordena_populacao(PopAv,PopAvOrd):-
	bsort(PopAv,PopAvOrd).

bsort([X],[X]):-!.
bsort([X|Xs],Ys):-
	bsort(Xs,Zs),
	btroca([X|Zs],Ys).


btroca([X],[X]):-!.

btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-
	VX>VY,!,
	btroca([X*VX|L1],L2).

btroca([X|L1],[X|L2]):-btroca(L1,L2).


gera_geracao(G,G,Pop,_):-!,
	write('Geracao '), write(G), write(':'), nl, write(Pop), nl.

gera_geracao(N,G,Pop,Tinicial):-
	(get_time(Tfinal),
	Tempo is Tfinal-Tinicial,
	(Tempo>10.00,!));
	write('Geracao '), write(N), write(':'), nl, write(Pop), nl,
	nth1(1,Pop, H),
	sacar_n(H,Z),
    random_permutation(Pop,Pop1),
	cruzamento(Pop,NPop1),
	mutacao(NPop1,NPop),
	avalia_populacao(NPop,NPopAv),
	ordena_populacao(NPopAv,NPopOrd),  %%NPopOrd é a população que ele dá print em cada geração
    algoritmo_nao_elitista(NPopOrd,Pop,NPopFinal),
	N1 is N+1,
	gera_geracao(N1,G,NPopFinal,Tinicial).

change_first_element(List, NewElement, Result) :-
    List = [_|Tail],
    Result = [NewElement|Tail].





sacar_n(_*N, Z):-
        Z is N.
escolhe_melhor_individuo(NPopOrd,Pop,NPopFinal):-
    nth1(1,NPopOrd, H),                                 %% primeiro individuo atual
    nth1(1,Pop, H1),                                    %% primeiro individuo antigo
    sacar_n(H,Z),                                       %%Z é o da nova geração 
    sacar_n(H1,Z1),                                     %%Z1 é o da antiga geração
    ((Z1<Z,!,change_first_element(NPopOrd,H1,NPopFinal));copy_term(NPopOrd, NPopFinal)).    


sort_list(List, Sorted) :-
    permutation(List, Sorted),
    is_sorted(Sorted),!.


sort_list(List, Sorted) :-
permutation(List, Sorted),
is_sorted(Sorted).

is_sorted([]).
is_sorted([_]).
is_sorted([_*X, _*Y | Tail]) :-
    X =< Y,
    is_sorted([_*Y | Tail]).

select_first(List, X, Result) :-
    select_first(List, X, Result, []).

select_first([], _, Acc, Acc).
select_first([H|T], X, Result, Acc) :-
    (   X > 0
    ->  NewAcc = [H|Acc],
        NewX is X - 1,
        select_first(T, NewX, Result, NewAcc)
    ;   reverse(Acc, Result)
    ).

keep_last(List, X, Result) :-
    length(List, Length),
    Start is Length - X,
    append(Front, Result, List),
    length(Front, Start),!.



calcula_20(L3,Num):-                                       
	length(L3, Count),
	TwentyPercent is Count * 0.2,
	ceiling(TwentyPercent,Num).



multiply_after_asterisk(List, Result) :-
    multiply_after_asterisk(List, Result, 0.0, 1.0).

multiply_after_asterisk([], [], _, _).
multiply_after_asterisk([X*_|Tail], [X*RandomNumber|ResultTail], Min, Max) :-
    !,
    random(Min, Max, RandomNumber),
    multiply_after_asterisk(Tail, ResultTail, Min, Max).
multiply_after_asterisk([X|Tail], [X|ResultTail], Min, Max) :-
    multiply_after_asterisk(Tail, ResultTail, Min, Max).


common_elements(List1, List2, Result) :-
findall(X*_, (member(X*Y, List1), member(X*Z, List2)), Result).

modify_list(List1, List2, Result) :-
    maplist(modify_list_helper(List2), List1, Result).

modify_list_helper(List2, [H|T]*_, [H|T]*NewValue) :-
    member([H|T]*NewValue, List2).



algoritmo_nao_elitista(NPopOrd,Pop,NPopFinal):-
	append(NPopOrd,Pop,L3),
	remove_duplicates(L3,L4),				%% lista obtida após a remoção dos individuos duplicados
	sort_list(L4,Atual),					%% ordena a lista 
	calcula_20(L3,Num),						%% Quantos elementos correspondem a 20% de elementos (arrendonda sempre para cima)
	select_first(Atual,Num,NPopInicial),	%% Obter esses primeiros elementos
	length(Atual, Count), 
	Num1 is Count-Num,						%% Obter o total menos os primeiros elementos
	keep_last(Atual,Num1,Auxiliar),			%% Colocar esses elementos na lista
	multiply_after_asterisk(Auxiliar,Auxiliar1),
	sort_list(Auxiliar1,Nova),
	length(NPopOrd, Count1),
	length(NPopInicial,Count2),
	Count3 is Count1-Count2,
	modify_list(Nova,Auxiliar,UltimosAuxiliar),
	select_first(UltimosAuxiliar,Count3,Ultimos),
	append(NPopInicial,Ultimos,NPopFinal).




gerar_pontos_cruzamento(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-
	entregas(N),
	NTemp is N+1,
	random(1,NTemp,P11),
	random(1,NTemp,P21),
	P11\==P21,!,
	((P11<P21,!,P1=P11,P2=P21);(P1=P21,P2=P11)).
gerar_pontos_cruzamento1(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).


cruzamento([],[]).
cruzamento([Ind*_],[Ind]).
cruzamento([Ind1*_,Ind2*_|Resto],[NInd1,NInd2|Resto1]):-
	gerar_pontos_cruzamento(P1,P2),
	prob_cruzamento(Pcruz),random(0.0,1.0,Pc),
	((Pc =< Pcruz,!,
        cruzar(Ind1,Ind2,P1,P2,NInd1),   %%Vai ser aqui para alterar para não ser entre pares
	  cruzar(Ind2,Ind1,P1,P2,NInd2))
	;
	(NInd1=Ind1,NInd2=Ind2)),
	cruzamento(Resto,Resto1).

preencheh([],[]).

preencheh([_|R1],[h|R2]):-
	preencheh(R1,R2).


sublista(L1,I1,I2,L):-
	I1 < I2,!,
	sublista1(L1,I1,I2,L).

sublista(L1,I1,I2,L):-
	sublista1(L1,I2,I1,L).

sublista1([X|R1],1,1,[X|H]):-!,
	preencheh(R1,H).

sublista1([X|R1],1,N2,[X|R2]):-!,
	N3 is N2 - 1,
	sublista1(R1,1,N3,R2).

sublista1([_|R1],N1,N2,[h|R2]):-
	N3 is N1 - 1,
	N4 is N2 - 1,
	sublista1(R1,N3,N4,R2).

rotate_right(L,K,L1):-
	entregas(N),
	T is N - K,
	rr(T,L,L1).

rr(0,L,L):-!.

rr(N,[X|R],R2):-
	N1 is N - 1,
	append(R,[X],R1),
	rr(N1,R1,R2).


elimina([],_,[]):-!.

elimina([X|R1],L,[X|R2]):-
	not(member(X,L)),!,
	elimina(R1,L,R2).

elimina([_|R1],L,R2):-
	elimina(R1,L,R2).

insere([],L,_,L):-!.
insere([X|R],L,N,L2):-
	entregas(T),
	((N>T,!,N1 is N mod T);N1 = N),
	insere1(X,N1,L,L1),
	N2 is N + 1,
	insere(R,L1,N2,L2).


insere1(X,1,L,[X|L]):-!.
insere1(X,N,[Y|L],[Y|L1]):-
	N1 is N-1,
	insere1(X,N1,L,L1).

cruzar(Ind1,Ind2,P1,P2,NInd11):-
	sublista(Ind1,P1,P2,Sub1),
	entregas(NumT),
	R is NumT-P2,
	rotate_right(Ind2,R,Ind21),
	elimina(Ind21,Sub1,Sub2),
	P3 is P2 + 1,
	insere(Sub2,Sub1,P3,NInd1),
	eliminah(NInd1,NInd11).


eliminah([],[]).

eliminah([h|R1],R2):-!,
	eliminah(R1,R2).

eliminah([X|R1],[X|R2]):-
	eliminah(R1,R2).

mutacao([],[]).
mutacao([Ind|Rest],[NInd|Rest1]):-
	prob_mutacao(Pmut),
	random(0.0,1.0,Pm),
	((Pm < Pmut,!,mutacao1(Ind,NInd));NInd = Ind),
	mutacao(Rest,Rest1).

mutacao1(Ind,NInd):-
	gerar_pontos_cruzamento(P1,P2),
	mutacao22(Ind,P1,P2,NInd).

mutacao22([G1|Ind],1,P2,[G2|NInd]):-
	!, P21 is P2-1,
	mutacao23(G1,P21,Ind,G2,NInd).
mutacao22([G|Ind],P1,P2,[G|NInd]):-
	P11 is P1-1, P21 is P2-1,
	mutacao22(Ind,P11,P21,NInd).

mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutacao23(G1,P,[G|Ind],G2,[G|NInd]):-
	P1 is P-1,
	mutacao23(G1,P1,Ind,G2,NInd).


% #### LOGI Predicates ###

flatten_sublists(SplitWeights1, SplitWeights2, SplitWeights3, FlatSplitWeights) :-
    append(SplitWeights1, SplitWeights2, SplitWeights12),
    append(SplitWeights12, SplitWeights3, FlatSplitWeights).

number_of_trucks(FlatSplitWeights) :-
    entregas_truck_gene(Truck1,Truck2,Truck3),
	generate_trucks(Truck1,Truck2,Truck3,Num1,Num2,Num3,SplitWeights1,SplitWeights2,SplitWeights3),
	NUMBER is Num1+Num2+Num3,
	flatten_sublists(SplitWeights1, SplitWeights2, SplitWeights3, FlatSplitWeights).

inicializa_with_parameters(NG,DP,P1,P2):-
	(retract(geracoes(_));true), asserta(geracoes(NG)),
	(retract(populacao(_));true), asserta(populacao(DP)),
	PC is P1/100, 
	(retract(prob_cruzamento(_));true), asserta(prob_cruzamento(PC)),
	PM is P2/100, 
	(retract(prob_mutacao(_));true), asserta(prob_mutacao(PM)).

gera_with_parameters(NG,DP,P1,P2,Truck1,Z,H):-
	retractall(entregas(16)),
	inicializa_with_parameters(NG,DP,P1,P2),
	gera_populacao(Truck1, Pop),
	write('Pop='),write(Pop),nl,
	gera_primeiro(Pop,Pop_Heuri),
	avalia_populacao(Pop_Heuri,PopAv),
	write('PopAv='),write(PopAv),nl,
	ordena_populacao(PopAv,PopOrd),
	geracoes(NG),
	get_time(Tinicial),
	gera_geracao_with_z(0,NG,PopOrd,Tinicial,Z,H),
	length(Truck1,Length),
	retractall(entregas(Length)),!.


gera_geracao_with_z(G,G,Pop,_,Z,I):-!,
	write('Geracao '), write(G), write(':'), nl, write(Pop), nl,
	nth1(1,Pop, H),
	sacar_n(H,Z).

gera_geracao_with_z(N,G,Pop,Tinicial,Z,I):-
	(get_time(Tfinal),
	Tempo is Tfinal-Tinicial,
	(Tempo>10.00,!));
	write('Geracao '), write(N), write(':'), nl, write(Pop), nl,
    random_permutation(Pop,Pop1),
	cruzamento(Pop,NPop1),
	mutacao(NPop1,NPop),
	avalia_populacao(NPop,NPopAv),
	ordena_populacao(NPopAv,NPopOrd),  %%NPopOrd é a população que ele dá print em cada geração
    algoritmo_nao_elitista(NPopOrd,Pop,NPopFinal),
	N1 is N+1,
	gera_geracao_with_z(N1,G,NPopFinal,Tinicial,Z,I).

gera_with_parameters1(NG,DP,P1,P2,Truck1,Z,I):-
	retractall(entregas(16)),
	gera_with_parameters(NG,DP,P1,P2,Truck1,Z,I),
	assert(entregas(16)).

gera_geracao_with_z_antigo(G,G,Pop,Z,I):-!,
	write('Geracao '), write(G), write(':'), nl, write(Pop), nl,
	nth1(1,Pop, H),
	sacar_n(H,Z).

gera_geracao_with_z_antigo(N,G,Pop,Z,I):-
	write('Geracao '), write(N), write(':'), nl, write(Pop), nl,
	cruzamento(Pop,NPop1),
	mutacao(NPop1,NPop),
	avalia_populacao(NPop,NPopAv),
	ordena_populacao(NPopAv,NPopOrd),  %%NPopOrd é a população que ele dá print em cada geração
	N1 is N+1,
	gera_geracao_with_z_antigo(N1,G,NPopOrd,Z,I).

gera_with_parameters_antigo(NG,DP,P1,P2,Truck1,Z,H):-
	retractall(entregas(16)),
	inicializa_with_parameters(NG,DP,P1,P2),
	gera_populacao(Truck1, Pop),
	write('Pop='),write(Pop),nl,
	avalia_populacao(Pop,PopAv),
	write('PopAv='),write(PopAv),nl,
	ordena_populacao(PopAv,PopOrd),
	geracoes(NG),
	gera_geracao_with_z_antigo(0,NG,PopOrd,Z,H),
	length(Truck1,Length),
	retractall(entregas(Length)),!.
